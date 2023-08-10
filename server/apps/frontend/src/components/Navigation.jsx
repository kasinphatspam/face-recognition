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
    Button
    } from "@nextui-org/react";

    {/* menu Item for small devices screen */}
    const menuItems = [
      "Profile",
      "Dashboard",
      "Activity",
      "Analytics",
      "System",
      "Deployments",
      "My Settings",
      "Team Settings",
      "Help & Feedback",
      "Log Out",
    ];

export default function Navigation(props) {

  {/* variables Status  */}
  const [StatusLogin, setStatusLogin] = React.useState(false);
  const [UserDetail, setUserDetail] = React.useState(null);
  
  const Active = props.Active
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
    isBordered
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}
  >
    {/* Tabs for small devices */}
    <NavbarContent className="sm:hidden" justify="start">
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
    </NavbarContent>

    {/* Brand & logo */}
    <NavbarContent className="pr-3" justify="start">
        {/* Logo */}
        {/* ... */}
        
      <NavbarBrand>
        <p className="font-bold text-inherit">Face Prove</p>
      </NavbarBrand>
    </NavbarContent>

    {/* Tabs for medium devices or desktop */}
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive={Active == "Customers" ? true : false}>
          <Link href="#" aria-current="page" color={Active == "Customers" ? "secondary" : "foreground"}>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

    {/* Sign up or Logined parts */}
    <NavbarContent as="div" justify="end">
        <NavbarItem hidden={!StatusLogin}>
          <DropdownAvatar />
        </NavbarItem>
        <NavbarItem hidden={StatusLogin}>
          <Button as={Link} color="primary" href="#" variant="light" className="mr-5">
            Sign Up
          </Button>
          <Button as={Link} color="primary" href="#" variant="flat">
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
              index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
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
  );
}

export function AnalyticsNavigation(props) {
    {/* variables Status */}
    const [StatusLogin, setStatusLogin] = React.useState(true);
    const [UserDetail, setUserDetail] = React.useState(null);
    
    const Active = props.Active
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    console.log(StatusLogin)
  return(
    <>
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      >
    {/* Tabs for small devices */}
    <NavbarContent className="sm:hidden" justify="start">
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
    </NavbarContent>

    {/* Brand & logo */}
    <NavbarContent className="pr-3" justify="start">
        {/* Logo */}
        {/* ... */}
        
      <NavbarBrand>
        <p className="font-bold text-inherit">Face Prove</p>
      </NavbarBrand>
    </NavbarContent>

    {/* Sign up or Logined parts */}
    <NavbarContent as="div" justify="end">
        <NavbarItem hidden={!StatusLogin}>
          <DropdownAvatar />
        </NavbarItem>
        <NavbarItem hidden={StatusLogin}>
          <Button as={Link} color="primary" href="#" variant="light" className="mr-5">
            Sign Up
          </Button>
          <Button as={Link} color="primary" href="#" variant="flat">
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
              index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
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
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
  );
}