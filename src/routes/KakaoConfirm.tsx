import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { kakaoLogIn } from "../api";  // 함수명 카멜케이스로 수정

export default function KakaoConfirm() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { search } = useLocation();

    const confirmLogin = useCallback(async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        
        if (code) {
            try {
                const status = await kakaoLogIn(code);
                
                if (status === 200) {
                    toast({
                        status: "success",
                        title: "카카오 로그인 성공! / Kakao Login Success!",
                        position: "bottom-right", 
                        description: "환영합니다! / Welcome!",
                        duration: 3000,
                        isClosable: true,
                        // 카카오 테마 컬러 적용
                        containerStyle: {
                            backgroundColor: '#FEE500',
                            color: '#000000',
                        }
                    });
                    
                    await queryClient.refetchQueries({
                        queryKey: ['me'],
                        type: 'active'
                    });
                    navigate("/");
                }
            } catch (error) {
                console.error("카카오 로그인 에러:", error);
                toast({
                    status: "error",
                    title: "로그인 실패 / Login Failed",
                    position: "bottom-right",
                    description: "카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요. / An error occurred during Kakao login. Please try again.",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/login");
            }
        }
    }, [search, queryClient, navigate, toast]);

    useEffect(() => {
        confirmLogin();
    }, [confirmLogin]);

    return (
        <VStack justifyContent={"center"} mt={40} spacing={6}>
            <Heading size="lg">카카오 로그인 진행 중...</Heading>
            <Text fontSize="md" color="gray.600">잠시만 기다려주세요.</Text>
            <Spinner 
                size="xl" 
                thickness="4px"
                speed="0.8s"
                color="#FEE500"  // 카카오 테마 컬러
            />
            <Text fontSize="sm" color="gray.500">카카오 계정으로 로그인하는 중입니다.</Text>
        </VStack>
    );
}