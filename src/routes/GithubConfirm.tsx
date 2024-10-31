import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { search } = useLocation();

    const confirmLogin = useCallback(async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        
        if (code) {
            try {
                const status = await githubLogIn(code);
                
                if (status === 200) {
                    toast({
                        status: "success",
                        title: "Welcome!",
                        position: "bottom-right", 
                        description: "Happy to have you back!",
                    });
                    
                    await queryClient.refetchQueries({
                        queryKey: ['me'],
                        type: 'active'
                    });
                    navigate("/");
                }
            } catch (error) {
                console.error("GitHub 로그인 에러:", error);
                toast({
                    status: "error",
                    title: "Login Failed",
                    position: "bottom-right",
                    description: "Unable to log in. Please try again.",
                });
                navigate("/login");
            }
        }
    }, [search, queryClient, navigate, toast]);

    // 한번만 요청하기, 무한루프 방지, 불필요한 API 요청 방지 
    useEffect(() => {
        confirmLogin();
    }, [confirmLogin]);

    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Processing log in...</Heading>
            <Text>Don't go anywhere.</Text>
            <Spinner size="lg" />
        </VStack>
    );
    }