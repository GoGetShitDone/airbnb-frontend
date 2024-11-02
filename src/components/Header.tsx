import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
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
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
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
        <Stack
            w="full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={4}
            px={{
                base: 4,
                md: 8,
                lg: 16
            }}
            borderBottomWidth={1}
            spacing={0}
        >
            <Box color={logoColor}>
                <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link>
            </Box>
            
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button 
                                onClick={onLoginOpen}
                                size={{
                                    base: "md",
                                    sm: "md"
                                }}
                            >
                                Log in</Button>
                            <LightMode>
                                <Button 
                                    onClick={onSignUpOpen} 
                                    colorScheme={"red"}
                                    size={{
                                        base: "md",
                                        sm: "md"
                                    }}
                                >
                                    Sign up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                            </MenuButton>
                            <MenuList>
                                {user?.is_host ? (
                                    <Link to="/rooms/upload">
                                        <MenuItem>Upload room</MenuItem>
                                    </Link>
                                ) : null}
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}