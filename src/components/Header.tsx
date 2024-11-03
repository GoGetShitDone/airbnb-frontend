import { FaMoon, FaSun } from "react-icons/fa";
import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
    Container,
    Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient();

    // Color values
    const headerBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const menuBg = useColorModeValue("white", "gray.800");
    const menuHoverBg = useColorModeValue("gray.100", "gray.700");

    const onLogOut = async () => {
        const toastId = toast({
            title: "Login out...",
            description: "Sad to see you go...",
            status: "loading",
            position: "bottom-right",
        });
        await logOut();
        queryClient.refetchQueries({ 
            queryKey: ["me"],
        });
        toast.update(toastId, {
            status: "success",
            title: "Done!",
            description: "See you later!",
        });
    };

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            backdropFilter="blur(12px)"
            backgroundColor={headerBg}
            borderBottom="1px solid"
            borderColor={borderColor}
            zIndex={100}
        >
            <Container maxW="container.xl">
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    py={4}
                    spacing={0}
                >
                    <Box color={logoColor}>
                        <Link to={"/"}>
                            <span 
                                style={{ fontSize: "36px"}}>🐸 🦊 🐻
                            </span>
                        </Link>
                    </Box>      
                    
                    <HStack spacing={2}>
                        <IconButton
                            onClick={toggleColorMode}
                            variant={"ghost"}
                            aria-label="Toggle dark mode"
                            icon={<Icon />}
                            rounded="full"
                            _hover={{
                                bg: menuHoverBg
                            }}
                        />
                        {!userLoading ? (
                            !isLoggedIn ? (
                                <>
                                    <Button 
                                        onClick={onLoginOpen}
                                        variant="ghost"
                                        rounded="full"
                                        size="sm"
                                        fontWeight="600"
                                    >
                                        Log in
                                    </Button>
                                    <LightMode>
                                        <Button 
                                            onClick={onSignUpOpen} 
                                            colorScheme={"red"}
                                            rounded="full"
                                            size="sm"
                                            fontWeight="600"
                                        >
                                            Sign up
                                        </Button>
                                    </LightMode>
                                </>
                            ) : (
                                <Menu>
                                    <MenuButton>
                                        <Avatar 
                                            name={user?.name} 
                                            src={user?.avatar} 
                                            size="sm"
                                            ring={2}
                                            ringColor={borderColor}
                                        />
                                    </MenuButton>
                                    <MenuList
                                        bg={menuBg}
                                        borderColor={borderColor}
                                        boxShadow="lg"
                                        rounded="2xl"
                                        overflow="hidden"
                                        py={1}
                                    >
                                        {user?.is_host ? (
                                            <>
                                                <Link to="/rooms/upload">
                                                    <MenuItem
                                                        _hover={{ bg: menuHoverBg }}
                                                        fontSize="sm"
                                                        fontWeight="500"
                                                    >
                                                        Upload room
                                                    </MenuItem>
                                                </Link>
                                                <Divider borderColor={borderColor} />
                                            </>
                                        ) : null}
                                        <MenuItem
                                            onClick={onLogOut}
                                            _hover={{ bg: menuHoverBg }}
                                            fontSize="sm"
                                            fontWeight="500"
                                            color="red.500"
                                        >
                                            Log out
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            )
                        ) : null}
                    </HStack>
                    <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
                    <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
                </HStack>
            </Container>
        </Box>
    );
}



// import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
// import {
//     Avatar,
//     Box,
//     Button,
//     HStack,
//     IconButton,
//     LightMode,
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuList,
//     Stack,
//     useColorMode,
//     useColorModeValue,
//     useDisclosure,
//     useToast,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import LoginModal from "./LoginModal";
// import SignUpModal from "./SignUpModal";
// import useUser from "../lib/useUser";
// import { logOut } from "../api";
// import { useQueryClient } from "@tanstack/react-query";



// export default function Header() {
//     const { userLoading, isLoggedIn, user } = useUser();
//     const {
//     isOpen: isLoginOpen,
//     onClose: onLoginClose,
//     onOpen: onLoginOpen,
//     } = useDisclosure();
//     const {
//     isOpen: isSignUpOpen,
//     onClose: onSignUpClose,
//     onOpen: onSignUpOpen,
//     } = useDisclosure();
//     const { toggleColorMode } = useColorMode();
//     const logoColor = useColorModeValue("red.500", "red.200");
//     const Icon = useColorModeValue(FaMoon, FaSun);
//     const toast = useToast();
//     const queryClient = useQueryClient();
//     const onLogOut = async () => {
//         const toastId = toast({
//             title: "Login out...",
//             description: "Sad to see you go...",
//             status: "loading",
//             position: "bottom-right",
//         });
//         await logOut();
//         queryClient.refetchQueries({ 
//             queryKey: ["me"],
//         });
//         toast.update(toastId, {
//             status: "success",
//             title: "Done!",
//             description: "See you later!",
//         });
//     };


//     return (
//         <Stack
//             w="full"
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             py={4}
//             px={{
//                 base: 4,
//                 md: 8,
//                 lg: 16
//             }}
//             borderBottomWidth={1}
//             spacing={0}
//         >
//             <Box color={logoColor}>
//                 <Link to={"/"}>
//                     <FaAirbnb size={"48"} />
//                 </Link>
//             </Box>
            
//             <HStack spacing={2}>
//                 <IconButton
//                     onClick={toggleColorMode}
//                     variant={"ghost"}
//                     aria-label="Toggle dark mode"
//                     icon={<Icon />}
//                 />
//                 {!userLoading ? (
//                     !isLoggedIn ? (
//                         <>
//                             <Button 
//                                 onClick={onLoginOpen}
//                                 size={{
//                                     base: "md",
//                                     sm: "md"
//                                 }}
//                             >
//                                 Log in</Button>
//                             <LightMode>
//                                 <Button 
//                                     onClick={onSignUpOpen} 
//                                     colorScheme={"red"}
//                                     size={{
//                                         base: "md",
//                                         sm: "md"
//                                     }}
//                                 >
//                                     Sign up
//                                 </Button>
//                             </LightMode>
//                         </>
//                     ) : (
//                         <Menu>
//                             <MenuButton>
//                                 <Avatar name={user?.name} src={user?.avatar} size={"md"} />
//                             </MenuButton>
//                             <MenuList>
//                                 {user?.is_host ? (
//                                     <Link to="/rooms/upload">
//                                         <MenuItem>Upload room</MenuItem>
//                                     </Link>
//                                 ) : null}
//                                 <MenuItem onClick={onLogOut}>Log out</MenuItem>
//                             </MenuList>
//                         </Menu>
//                     )
//                 ) : null}
//             </HStack>
//             <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
//             <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
//         </Stack>
//     );
// }