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
import { FaUser, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api";  // API 함수는 따로 만들어야 합니다

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    name: string;
    email: string;
    username: string;
    password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast({
                title: "Welcome!",
                description: "Account created successfully!",
                status: "success",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
            onClose();
            reset();  // 폼 초기화
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error: any) => {
            console.error("SignUp error:", error);
            toast({
                title: "Sign up failed",
                description: error.response?.data?.error || "Something went wrong",
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
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4}>
                        <InputGroup>
                            <InputLeftElement>
                                <Box color="gray.500">
                                    <FaUserSecret />
                                </Box>
                            </InputLeftElement>
                            <Input
                                {...register("name", {
                                    required: "Please write your name",
                                })}
                                isInvalid={Boolean(errors.name)}
                                variant="filled"
                                placeholder="Name"
                            />
                        </InputGroup>
                        {errors.name && (
                            <Box color="red.500" fontSize="sm" w="100%">
                                {errors.name.message}
                            </Box>
                        )}

                        <InputGroup>
                            <InputLeftElement>
                                <Box color="gray.500">
                                    <FaEnvelope />
                                </Box>
                            </InputLeftElement>
                            <Input
                                {...register("email", {
                                    required: "Please write your email",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Please write a valid email",
                                    },
                                })}
                                isInvalid={Boolean(errors.email)}
                                variant="filled"
                                placeholder="Email"
                            />
                        </InputGroup>
                        {errors.email && (
                            <Box color="red.500" fontSize="sm" w="100%">
                                {errors.email.message}
                            </Box>
                        )}

                        <InputGroup>
                            <InputLeftElement>
                                <Box color="gray.500">
                                    <FaUser />
                                </Box>
                            </InputLeftElement>
                            <Input
                                {...register("username", {
                                    required: "Please write a username",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters",
                                    },
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
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
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
                            Sign up
                        </Button>
                        <SocialLogin />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}