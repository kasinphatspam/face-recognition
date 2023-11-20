import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import Switchthemebutton from "./Button/SwitchTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

{
  /* menu Item for small devices screen */
}
const menuItems = [
  "Dashboard",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

export default function Navigation(props) {
  const { user } = useAuth();
  {
    /* variables Status  */
  }
  const Active = props.Active;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-screen"
    >
      {/** ------------------------------------------------- */}
      {/* Tabs for small devices */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Brand & logo */}
      <NavbarContent className="pr-3" justify="start">
        <NavbarBrand>
          <Link href="/">
            <img src="/logo_svg_color.svg" className="w-6 h-6" />
            {/* ... */}
            <p className="font-bold px-4">Face Prove</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/** ------------------------------------------------- */}
      {/* Tabs for medium devices or desktop */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Other navigation links */}
        {Active === "Customers" && (
          <>
            <NavbarItem>
              <ScrollLink
                to="subscriptionSection" // ID of the section you want to scroll to
                spy={true}
                smooth={true}
                duration={1000}
                offset={0} // Adjust the offset as needed
                className="cursor-pointer"
              >
                Subscription
              </ScrollLink>
            </NavbarItem>
            <NavbarItem>
              <ScrollLink
                to="featuresSection" // ID of the section you want to scroll to
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70} // Adjust the offset as needed
                className="cursor-pointer"
              >
                Features
              </ScrollLink>
            </NavbarItem>
          </>
        )}
        {Active === "Contactus" && (
          <>
            <NavbarItem>
              <Link color="foreground" href="/subscription">Subscription</Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/">Home Page</Link>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <Link color="foreground" href="/contactus">Contact Us</Link>
        </NavbarItem>
      </NavbarContent>

      {/* Sign up or Logined parts */}
      <NavbarContent as="div" justify="end">
        <NavbarItem className="hidden sm:flex">
          <Switchthemebutton className="" size="sm" />
        </NavbarItem>
        <NavbarItem hidden={!user}>
          <DropdownAvatar />
        </NavbarItem>
        <NavbarItem hidden={user}>
          <Button
            as={Link}
            color="primary"
            href="/signup"
            variant="light"
            className="mr-5"
          >
            Sign Up
          </Button>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Menu Toggle for small devices */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Switchthemebutton/>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
export function FaceRecognitionNavigation() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Tabs for small devices */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        {/* Brand & logo */}
        <NavbarContent className="pr-3" justify="start">
          <NavbarBrand>
            <Link href="/">
              <img src="/logo_svg_color.svg" className="w-8 h-8" />
              {/* ... */}
              <p className="font-bold px-4">Face Prove</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Tabs for medium devices or desktop */}
        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
        >
          <p className="font-semibold dark:white text-xl">Face Reconition System</p>
        </NavbarContent>
        {/* Sign up or Logined parts */}
        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <Switchthemebutton className="" size="sm" />
          </NavbarItem>
          <NavbarItem hidden={!(user == null)}>
            <DropdownAvatar />
          </NavbarItem>
          <NavbarItem hidden={(user == null)}>
            <Button
              as={Link}
              color="primary"
              href="/signup"
              variant="light"
              className="mr-5"
            >
              Sign Up
            </Button>
            <Button as={Link} color="primary" href="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Menu Toggle for small devices */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
export function AnalyticsNavigation(props) {
  const { user } = useAuth();
  {
    /* variables Status */
  }
  const Active = props.Active;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Tabs for small devices */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        {/* Brand & logo */}
        <NavbarContent className="pr-3" justify="start">
          <NavbarBrand>
            <Link href="/">
              <img src="/logo_svg_color.svg" className="w-8 h-8" />
              {/* ... */}
              <p className="font-bold px-4">Face Prove</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Tabs for medium devices or desktop */}
        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
        ></NavbarContent>
        {/* Sign up or Logined parts */}
        <NavbarContent as="div" justify="end">
          <NavbarItem hidden={!user}>
            <DropdownAvatar />
          </NavbarItem>
          <NavbarItem hidden={user}>
            <Button
              as={Link}
              color="primary"
              href="/signup"
              variant="light"
              className="mr-5"
            >
              Sign Up
            </Button>
            <Button as={Link} color="primary" href="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Menu Toggle for small devices */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}

export function DropdownAvatar() {
  const navigate = useNavigate();
  const { user, organizeData, useLogout } = useAuth();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
        />
      </DropdownTrigger>
      {!!organizeData ? (
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={async (key) => {
            if (key === "logout") {
              await useLogout();
              navigate("/");
            }
            if (key === "dashboard") {
              navigate("/dashboard");
            }
            if (key === "settings") {
              navigate("/setting");
            }
          }}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email ?? ""}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>  
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={async (key) => {
            if (key === "logout") {
              await useLogout();
              navigate("/");
            }
            if (key === "create") {
              navigate("/new");
            }
          }}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email ?? ""}</p>
          </DropdownItem>
          <DropdownItem key="create">Create / Join</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
