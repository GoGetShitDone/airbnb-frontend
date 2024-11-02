import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usernameLogIn } from "../api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: usernameLogIn,
        onSuccess: () => {
            toast({
                title: "Welcome back!",
                description: "Happy to see you again!",
                status: "success",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast({
                title: "Login failed",
                description: "Please check your username and password",
                status: "error",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const onSubmit = (data: IForm) => {
        mutation.mutate(data);
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4}>
                        <InputGroup>
                            <InputLeftElement>
                                <Box color="gray.500">
                                    <FaUserNinja />
                                </Box>
                            </InputLeftElement>
                            <Input
                                {...register("username", {
                                    required: "Please write a username",
                                })}
                                isInvalid={Boolean(errors.username)}
                                variant="filled"
                                placeholder="Username"
                            />
                        </InputGroup>
                        {errors.username && (
                            <Box color="red.500" fontSize="sm" w="100%">
                                {errors.username.message}
                            </Box>
                        )}
                        <InputGroup>
                            <InputLeftElement>
                                <Box color="gray.500">
                                    <FaLock />
                                </Box>
                            </InputLeftElement>
                            <Input
                                {...register("password", {
                                    required: "Please write a password",
                                })}
                                isInvalid={Boolean(errors.password)}
                                type="password"
                                variant="filled"
                                placeholder="Password"
                            />
                        </InputGroup>
                        {errors.password && (
                            <Box color="red.500" fontSize="sm" w="100%">
                                {errors.password.message}
                            </Box>
                        )}
                        <Button
                            isLoading={mutation.isPending}
                            type="submit"
                            colorScheme="red"
                            w="100%"
                        >
                            Log in
                        </Button>
                        <SocialLogin />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}