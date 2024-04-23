import { Box, Flex, Image, Text, Icon, Switch} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BiMailSend, BiUser } from "react-icons/bi";
import { GoPersonFill, GoSignIn, GoSignOut } from "react-icons/go";

import { MenuContent } from "./common";
import { Item } from "./common/SelectorMenuList";
import { SearchBar } from ".";
import { useAppColorMode, useCart } from "../hooks";
import logo from "../assets/logo1.svg";
import { useContext } from "react";
import { UserContext } from "../contexts";
import useUsers from "../hooks/useUsers";

function Header() {
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const cart = useCart();
  const {logout } = useUsers();

  const handleSignOut = () => {
    logout()
  }

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext)
  
  const controls: Item[] = [
    { label: "Sign In", icon: <GoSignIn />, route: "/signin" },
    { label: "Sign Up", icon: <GoSignOut />, route: "/signup" },
    {
      label: isDarkMode ? "Dark Mode" : "Light Mode",
      icon: <Switch size="sm" isChecked={isDarkMode} />,
      onClick: () => toggleColorMode(),
    },
  ];
  const userControls: Item[] =[
    {label: (currentUser ? currentUser.name : "Username"), icon: <GoPersonFill/>},
    {label: (currentUser ? currentUser.email : "Email"), icon: <BiMailSend/>},
    {label: "Profile", icon: <BiUser/>, route:"/profile"},
    { label: "Sign out", icon: <GoSignOut />, 
      onClick: () => handleSignOut(),
    },
  ];

  const handleItemSelection = (item: Item) =>
    item.route ? navigate(item.route) : item.onClick?.();

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
          <Link to={"/"}>
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
        
        { currentUser ? (
          <Box mr={10} display="flex">      
          <MenuContent
              Button={
                <Image 
                  src={currentUser.profilePicture}
                  boxSize={30} 
                  rounded={30}/>}
              data={userControls}
              onSelectItem={handleItemSelection}
            />
          <Box>
            {cart.count ? (
              <>
                <Link to={"/cart"}>
                  <Icon
                    as={FaShoppingCart}
                    color={"white"}
                    px={2}
                    h={"auto"}
                    w={"auto"}
                    boxSize={10}
                    _hover={{ cursor: "pointer" }}
                  />
                </Link>
                <Text
                  bg={"blue.300"}
                  color={"white"}
                  w={6}
                  h={6}
                  align={"center"}
                  border={14}
                  borderRadius={18}
                  position={"fixed"}
                  mt={"-14"}
                  ml={"6"}
                >
                  {cart.count}
                </Text>
              </>
            ) : null}
          </Box>
        </Box>
        ) : 
        (<Box mr={10} display="flex">        
        
          <MenuContent
              Button={<BiUser size={20} />}
              data={controls}
              onSelectItem={handleItemSelection}
            />
          <Box>
            {cart.count ? (
              <>
                <Link to={"/cart"}>
                  <Icon
                    as={FaShoppingCart}
                    color={"white"}
                    px={2}
                    h={"auto"}
                    w={"auto"}
                    boxSize={10}
                    _hover={{ cursor: "pointer" }}
                  />
                </Link>
                <Text
                  bg={"blue.300"}
                  color={"white"}
                  w={6}
                  h={6}
                  align={"center"}
                  border={14}
                  borderRadius={18}
                  position={"fixed"}
                  mt={"-14"}
                  ml={"6"}
                >
                  {cart.count}
                </Text>
              </>
            ) : null}
          </Box>
        </Box>
        )}
         
      </Flex>
    </Box>
  );
}

export default Header;
