import { useEffect, useState } from "react";
import { Box, Flex, Image, Switch } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiMailSend, BiUser } from "react-icons/bi";
import { GoPersonFill, GoSignIn, GoSignOut } from "react-icons/go";

import { Item } from "./common/SelectorMenuList";
import { MenuContent } from "./common";
import { SearchBar } from ".";
import { useAppColorMode } from "../hooks";
// import auth from "../services/auth";
import logo from "../assets/logo1.svg";
import ShoppingCartIcon from "./cart/Icon";
import useUsers from "../hooks/useUsers";

const authenticationControls: Item[] = [
  { label: "Sign In", icon: <GoSignIn />, route: "/signin" },
  { label: "Sign Up", icon: <GoSignOut />, route: "/signup" },
];

function Header() {
  const {currentUser} = useUsers()
  const [controls, setControls] = useState<Item[]>([]);
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const { logout } = useUsers();
  const navigate = useNavigate();
  // console.log(currentUser)

  useEffect(() => {
    initControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.name, controls.length]);

  const initControls = () => {
    const base = [
      {
        label: isDarkMode ? "Dark Mode" : "Light Mode",
        icon: <Switch size="sm" isChecked={isDarkMode} />,
        onClick: () => toggleColorMode(),
      },
    ];

    setControls([
      ...(currentUser ? authenticatedControls : authenticationControls),
      ...base,
    ]);
  };

  const handleSignOut = () => logout();

  const authenticatedControls: Item[] = [
    {
      label: currentUser?.name || "Username",
      icon: <GoPersonFill />,
    },
    { label: currentUser?.email || "Email", icon: <BiMailSend /> },
    { label: "Profile", icon: <BiUser />, route: "/dashboard" },
    { label: "Sign out", icon: <GoSignOut />, onClick: () => handleSignOut() },
  ];

  const handleItemSelection = (item: Item) =>
    item.route ? navigate(item.route) : item.onClick?.();

  const Avatar = currentUser?.profilePicture ? (
    <Image src={currentUser.profilePicture} boxSize={30} rounded={30} />
  ) : (
    <BiUser size={18} />
  );

  return (
    <Box
      bg="blue.900"
      h="70px"
      w="100%"
      top={0}
      right={0}
      left={0}
      zIndex={999}
      position="fixed"
    >
      <Flex align={"center"} justify={"space-between"} w={"100%"} h={"100%"}>
        <Box>
          <Link to="/">
            <Image
              src={logo}
              alt="logo"
              h={16}
              w={"auto"}
              ml={10}
              borderRadius={3}
              border={2}
            />
          </Link>
        </Box>
        <SearchBar />
        <Box mr={10} display="flex">
          <MenuContent
            Button={Avatar}
            data={controls}
            onSelectItem={handleItemSelection}
          />
          <ShoppingCartIcon />
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
