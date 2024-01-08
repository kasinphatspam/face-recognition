import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnalyticsNavigation } from "@/components/Navigation";
import Vertical from "@/components/Vertical";
import { CornerLeftDown, User, Archive } from "react-feather";
import {
  Divider,
  Tabs,
  Tab,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Switch,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { Check, X } from "react-feather";
import Employeecomponent from "@/components/Employeelist";
import { getAllEmployees, getContacts, getRequests } from "@/api/get";
import { ColumnText } from "@/components/Section/ColumnText";
import { updateOrg } from "@/api/put";
import { toast } from "react-toastify";
import { config } from "@/utils/toastConfig";
import { deleteOrganization, leaveOrganization } from "@/api/delete";
import { useAuth } from "@/contexts/AuthContext";
import { messageCode } from "@/utils/errMessage";

export default function OrganizationInfo() {
  const form = useRef(null);
  const toastapi = useRef(null);
  const [name, setName] = useState(null);
  const { user, userStat, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [isPublic, setIsPubilc] = useState(
    user?.organization?.isPublic ?? false
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // ------------------------------------ API ------------------------------------------

  const { data: employees, status: empStatus } = useQuery({
    enabled: !!user,
    queryKey: ["getEmployees"],
    queryFn: async () => {
      return getAllEmployees(user.organization);
    },
  });
  const { data: contacts, status: conStatus } = useQuery({
    enabled: !!user,
    queryKey: ["getContacts"],
    queryFn: async () => {
      return getContacts(user.organization);
    },
  });
  const { data: requests, status: reqStatus } = useQuery({
    enabled: !!user,
    queryKey: ["getRequests"],
    queryFn: async () => {
      return getRequests();
    },
  });

  const updateOrganization = useMutation({
    mutationKey: ["updateOrganization"],
    mutationFn: async (data) => {
      return updateOrg(data);
    },
    onMutate: () => {
      const toastput = toast.loading("please wait...", { containerId: "main" });
      toastapi.current = toastput;
    },
  });

  const LeaveOrganization = useMutation({
    mutationKey: ["leaveorganization"],
    mutationFn: async () => {
      return leaveOrganization();
    },
    onSuccess: async () => {
      await fetchUser();
      toast.update(
        toastapi.current,
        config("leave organization successfully", "success")
      );
      navigate("/");
      toastapi.current = null;
    },
    onError: (error) => {
      toast.update(
        toastapi.current,
        config(
          `${messageCode(error.response?.data?.message ?? error.message)}`,
          "error"
        )
      );
      toastapi.current = null;
      DeleteOrganization.reset();
    },
  });

  const DeleteOrganization = useMutation({
    mutationKey: ["deleteorganization"],
    mutationFn: async () => {
      return deleteOrganization();
    },
    onSuccess: async () => {
      await fetchUser();
      toast.update(
        toastapi.current,
        config("delete organization information successfully", "success")
      );
      navigate("/");
      toastapi.current = null;
    },
    onError: (error) => {
      toast.update(
        toastapi.current,
        config(
          `${messageCode(error.response?.data?.message ?? error.message)}`,
          "error"
        )
      );
      toastapi.current = null;
      DeleteOrganization.reset();
    },
  });
  // ----------------------------------- GENERAL ----------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: event.target[0].value,
      description: event.target[1].value,
    };
    if (data) {
      updateOrganization.mutate(data, {
        onMutate: () => {
          const toastput = toast.loading("please wait...", {
            containerId: "main",
          });
          toastapi.current = toastput;
        },
        onSuccess: async () => {
          await fetchUser();
          toast.update(
            toastapi.current,
            config("update organization information successfully", "success")
          );
          toastapi.current = null;
        },
        onError: async (error) => {
          toast.update(
            toastapi.current,
            config(
              `${messageCode(error.response?.data?.message ?? error.message)}`,
              "error"
            )
          );
          toastapi.current = null;
          updateOrganization.reset();
        },
      });
    }
    event.target.reset();
  };

  const handleApprove = (event, action) => {
    event.preventDefault();
    if (action === "approve") {
    } else if (action === "decline") {
    }
  };

  const handleAccess = (value) => {
    const data = {
      isPublic: value,
    };
    if (data) {
      updateOrganization.mutate(data, {
        onSuccess: () => {
          setIsPubilc(value);
          toast.update(
            toastapi.current,
            config(
              `Organization accessibility set to ${
                value ? "Public" : "Private"
              }`,
              "success"
            )
          );
          toastapi.current = null;
        },
        onError: (error) => {
          toast.update(
            toastapi.current,
            config(
              `Failed to set organization accessibility (code: ${
                error.code || error.response?.data?.code || "303"
              })`,
              "error"
            )
          );
          toastapi.current = null;
        },
      });
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  const visible = ["name", "email", "status", "actions"];

  const handleLeaveClick = () => {
    LeaveOrganization.mutate();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete {user.organization.name} organization
              </ModalHeader>
              <ModalBody>
                <Archive className="mx-auto w-12 h-12 mt-8" strokeWidth={1.2} />
                <p className="text-sm text-gray-500">
                  to delete this organization type{" "}
                  <span className="font-semibold">
                    {user.organization.name}
                  </span>{" "}
                  and continue
                </p>
                <Input
                  autoFocus
                  aria-label="Email"
                  placeholder={user.organization.name}
                  size="sm"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="w-1/2 mx-auto"
                  variant="ghost"
                  onPress={async () => {
                    if (name === user.organization.name) {
                      DeleteOrganization.mutate();
                      onClose();
                    }
                  }}
                >
                  delete organization
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Pages offset setup */}
      <div className="relative min-h-screen w-screen bg-gray-50 dark:bg-zinc-900">
        <AnalyticsNavigation Active="Permission" />
        <div className="flex flex-row relative">
          <Vertical />
          <div className="relative flex flex-row mt-12 ml-[80px] mb-6">
            <div className="flex flex-col">
              {/* Head text display forum */}
              <div className="flex flex-row mt-6 ml-1">
                <p className="text-inherit font-light text-md align-bottom hover:underline">
                  Analytics
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2 hover:underline">
                  Organization
                </p>
                <p className="text-inherit font-light text-md align-bottom ml-2">
                  /
                </p>
                <p className="text-blue-500 font-medium text-md align-bottom ml-2 hover:underline">
                  {userStat === "pending"
                    ? "loading.."
                    : user.organization.name}
                </p>
              </div>

              {/* box context */}
              <div className="relative w-[75vw] min-h-[300px] -ml-4 mt-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
                <div className="absolute top-14 right-14 flex flex-col">
                  <Button
                    variant="bordered"
                    color="danger"
                    size="sm"
                    className=" drop-shadow-sm dark:drop-shadow-none w-26 mb-2 text-md px-4"
                    onPress={() => handleLeaveClick()}
                  >
                    leave
                  </Button>
                </div>
                <div className="flex flex-row mt-4">
                  <CornerLeftDown className="h-6 w-6 mt-8 mr-1 ml-2" />
                  <p className="font-bold text-5xl text-inherit ml-2 mt-1">
                    {userStat === "pending"
                      ? "loading.."
                      : user.organization.name || "fetch failed"}
                  </p>
                </div>
                <p className="font-light text-gray-400 text-md ml-11 mb-4">
                  {userStat === "pending"
                    ? "loading.."
                    : user.organization.description ||
                      "Service / Production / Evaluation system for company"}
                </p>
                <Tabs
                  key="org"
                  variant="underlined"
                  classNames={{
                    tabList:
                      "gap-6 w-full ml-8 mt-3 relative rounded-none p-0 border-b-1 border-divider",
                    cursor: "w-full bg-black dark:bg-white",
                    tab: "max-w-fit px-3 h-10",
                    tabContent:
                      "group-data-[selected=true]:text-[#073763] dark:group-data-[selected=true]:text-cyan-400/70 group-data-[selected=true]:font-bold group-data-[selected=true]:text-xl",
                  }}
                  size="lg"
                >
                  <Tab key="teams" title="Teams">
                    <div className="relative">
                      <div className="absolute top-1 right-14 flex flex-col">
                        <p className="font-medium ml-[68px] text-right">
                          passcode
                        </p>
                        <p className="font-semibold text-4xl text-right">
                          {userStat === "pending"
                            ? "loading.."
                            : user.organization.passcode || "000000"}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row mt-4 ml-8">
                          <div className="flex flex-col">
                            <div className="font-semibold text-lg">Member</div>
                            <div className="flex flex-row">
                              <User className="h-4 w-4 mt-1" />
                              <div className="font-light ml-2">
                                {empStatus === "pending" ? 0 : employees.length}
                              </div>
                            </div>
                          </div>
                          <Divider
                            orientation="vertical"
                            className="mx-8 h-10 mt-3"
                          />
                          <div className="flex flex-col">
                            <div className="font-semibold text-lg">Contact</div>
                            <div className="flex flex-row">
                              <User className="h-4 w-4 mt-1" />
                              <div className="font-light ml-2">
                                {conStatus === "pending"
                                  ? 0
                                  : conStatus === "success"
                                    ? contacts.length
                                    : "0"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          {employees === undefined ? (
                            <div>Loading..</div>
                          ) : (
                            <Employeecomponent
                              isEmployee
                              data={employees}
                              columns={columns}
                              visible_columns={visible}
                              handleDelete={(id) => console.log(id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="activity" title="Activity">
                    <div className="mt-8 mx-8">
                      {reqStatus === "pending" ? (
                        <div>Loading..</div>
                      ) : requests?.requests?.length === 0 ? (
                        <div className="mx-auto w-64 text-black/50 dark:text-white/40 my-8">
                          No activity log at the moment
                        </div>
                      ) : (
                        <div className="mx-auto w-64 text-black/50 dark:text-white/40 my-8">
                          No activity log at the moment
                        </div>
                      )}
                    </div>
                  </Tab>
                  <Tab
                    key="joinreq"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Join Requests</span>
                        <Chip size="sm" variant="flat">
                          {requests?.requests?.length ?? "0"}
                        </Chip>
                      </div>
                    }
                  >
                    <div className="mt-8 mx-8">
                      {reqStatus === "pending" ? (
                        <div>Loading..</div>
                      ) : requests?.requests?.length === 0 ? (
                        <div className="mx-auto w-64 text-black/50 dark:text-white/40 my-8">
                          {" "}
                          No user request at the moment
                        </div>
                      ) : (
                        requests?.requests.map((contact) => (
                          <div className="flex w-full px-10 py-4 hover:bg-gray-50 rounded-md gap-y-4">
                            <div className="flex flex-row w-5/6">
                              <Avatar
                                src={contact.user?.image}
                                className="mr-4"
                              />
                              <div className="flex flex-col -mt-0.5">
                                <p className="font-semibold">{`${contact.user?.firstname} ${contact.user?.lastname}`}</p>
                                <p className="text-tiny text-gray-400">
                                  {contact.user?.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-row gap-x-4">
                              <Button
                                isIconOnly
                                color="success"
                                aria-label="approve"
                                radius="full"
                                onClick={(e) => handleApprove(e, "approve")}
                              >
                                <Check color="white" />
                              </Button>
                              <Button
                                isIconOnly
                                color="danger"
                                aria-label="approve"
                                radius="full"
                                onClick={(e) => handleDecline(e, "decline")}
                              >
                                <X color="white" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Tab>
                  <Tab key="settings" title="Settings">
                    <div className="mt-8 mx-8">
                      <ColumnText index="name" title="Organization details">
                        <form ref={form} onSubmit={handleSubmit}>
                          <div className="flex flex-col">
                            <label className="ml-1 font-medium text-sm text-gray-500">
                              Name
                            </label>
                            <Input
                              aria-label="Name"
                              type="text"
                              size="sm"
                              variant="underlined"
                              defaultValue={
                                userStat === "pending"
                                  ? "loading.."
                                  : user.organization.name
                              }
                              className="w-80 -mt-2"
                            />
                            <label className="ml-1 mt-4 font-medium text-sm text-gray-500">
                              Description
                            </label>
                            <Input
                              aria-label="Description"
                              type="text"
                              variant="underlined"
                              defaultValue={
                                userStat === "pending"
                                  ? "loading.."
                                  : user.organization
                                    ? user.organization.description
                                    : "..."
                              }
                              className="w-2/3 -mt-2"
                            />
                            <div className="flex flex-row gap-x-5 mt-3">
                              <Button
                                type="submit"
                                className="mt-4 w-24"
                                color="primary"
                              >
                                save
                              </Button>
                              <Button
                                onClick={() => form.current.reset()}
                                className="mt-4 w-24"
                                color="default"
                              >
                                cancel
                              </Button>
                            </div>
                          </div>
                        </form>
                      </ColumnText>
                      <Divider className="my-8" />
                      <ColumnText index="permission" title="Accessibility">
                        <div className="flex flex-row">
                          <p className="text-gray-500 text-sm w-2/3">
                            everyone can access this organization, if not user
                            need to grant permission from administrator
                          </p>
                          <Switch
                            className="mx-auto"
                            isSelected={isPublic}
                            onValueChange={(v) => handleAccess(v)}
                          />
                        </div>
                      </ColumnText>
                      <Divider className="my-8" />
                      <ColumnText index="delete" title="Delete organization">
                        <div className="flex flex-row w-full">
                          <p className="text-gray-500 text-sm w-2/3 mt-1.5">
                            Permanently delete all data and user information
                            within the organization
                          </p>
                          <Button
                            variant="flat"
                            color="danger"
                            size="sm"
                            className=" drop-shadow-md dark:drop-shadow-none w-26 mb-2 mx-auto text-md px-4"
                            onPress={onOpen}
                          >
                            deactivated
                          </Button>
                        </div>
                      </ColumnText>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
