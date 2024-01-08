import { getPlans } from "@/api/get";
import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { config } from "@/utils/toastConfig";
import { postAdminOrg } from "@/api/post";

export default function AdminPage() {
  const adminid = useRef(null);
  const { data: plans, status: planStat } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      return getPlans();
    },
  });

  const createOrganization = useMutation({
    mutationKey: ["createAdminOrg"],
    mutationFn: async (organization, planId) => {
      return await postAdminOrg(organization, planId);
    },
    onMutate: () => {
      const adminid = toast.loading("Please wait...", { containerId: "main" })
      adminid.current = adminid;
    },
    onSuccess: () => {
      toast.update(
        adminid,
        config("Create organization successfully", "success")
      );
      adminid.current = null;
    },
    onError: (err) => {
      toast.update(
        adminid,
        config(
          `${messageCode(err.response?.data?.message ?? err.message)}`,
          "error"
        )
      );
      adminid.current = null;
    },
  });

  const [organizations, setOrganizations] = useState({});
  const [value, setValue] = useState(new Set([]));

  const handleOnChange = (event) => {
    setOrganizations((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateClick = (event) => {
    event.preventDefault();
    const planId = value.values().next().value
    if (planId && organizations) {
      createOrganization.mutate(organizations.name, planId);
    } else {
      toast.error("Please insert data in a blank form");
    }
  }

  return (
    <>
      <div className="relative flex flex-col overflow-hidden w-screen h-screen bg-gray-50 dark:bg-stone-900">
        <Navigation Active="Contactus" />
        <div className="flex flex-col grow w-full h-full py-20 px-32">
          <div className="flex flex-col">
            <p className="text-3xl font-semibold mb-8">Admin sessions</p>
            <div className="w-full">
              <p>Organization</p>
              <Divider />
              <div className="flex flex-col mt-8 ml-4 gap-y-4 px-1.5">
                <div className="flex flex-row gap-x-4">
                  <Input
                    isRequired
                    label="name"
                    className="w-2/5"
                    placeholder="Enter organization name"
                    type="text"
                    variant="bordered"
                    name="name"
                    onChange={handleOnChange}
                  />
                  <Input
                    isRequired
                    label="name"
                    className="w-2/5"
                    placeholder="Enter organization name"
                    type="text"
                    variant="bordered"
                    name="name"
                    onChange={handleOnChange}
                  />
                </div>
                {plans?.length !== 0 && planStat !== "pending" && (
                  <Select
                    label="Plan package"
                    variant="bordered"
                    placeholder="Select an plan package"
                    selectedKeys={value}
                    className="max-w-xs"
                    onSelectionChange={setValue}
                  >
                    {plans?.map((plan) => (
                      <SelectItem key={plan.id} value={plan.title}>
                        {plan.title}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                {value.size !== 0 && (
                  <div className="w-1/2 mt-6">
                    <p>plan details</p>
                    <Divider className="w-full" />
                    <div className="mt-4 ml-0.5">
                      {plans?.map((plan, index) => {
                        if (index == value.values().next().value) {
                          return (
                            <>
                              <p className="text-3xl font-semibold">{`- ${plan.title}`}</p>
                              <div className="ml-4 mt-2">
                                <div className="flex flex-row gap-x-8">
                                  <p className="font-semibold text-gray-600">
                                    Plan cost
                                  </p>
                                  <p className="text-gray-500">{plan.cost}</p>
                                </div>
                                <div className="flex flex-row gap-x-8">
                                  <p className="font-semibold text-gray-600">
                                    Plan limit employee
                                  </p>
                                  <p className="text-gray-500">
                                    {plan.limitEmployee}
                                  </p>
                                </div>
                                <div className="flex flex-row gap-x-8">
                                  <p className="font-semibold text-gray-600">
                                    Plan limit Contact
                                  </p>
                                  <p className="text-gray-500">
                                    {plan.limitContact}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                <div className="w-32 mt-8">
                  <Button
                    color="primary"
                    disabled={createOrganization.status === "pending"}
                    onClick={(e) => handleCreateClick(e)}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
