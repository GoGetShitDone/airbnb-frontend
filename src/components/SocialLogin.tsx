import { FaComment, FaGithub } from "react-icons/fa";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
    let kakaoParams = {
        client_id: "51aa4ec670ba8f79ce4ab6170de7e17c",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
        scope: "profile_nickname, profile_image, account_email, talk_message",
    };
    const githubParams = {
        client_id: "Iv23liBIYifqisaoJzr9",
        scope: "read:user,user:email",
    };
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
        kakaoParams
    ).toString()}`;
    const githubUrl = `https://github.com/login/oauth/authorize?${new URLSearchParams(
        githubParams
    ).toString()}`;
    return (
        <Box mb={4}>
        <HStack my={8}>
            <Divider />
            <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
            Or
            </Text>
            <Divider />
        </HStack>
        <VStack>
            <Button as="a" href={githubUrl} w="100%" leftIcon={<FaGithub />}>
            Continue with Github
            </Button>
            <Button
            as="a"
            href={kakaoUrl}
            w="100%"
            leftIcon={<FaComment />}
            colorScheme={"yellow"}
            >
            Continue with Kakao
            </Button>
        </VStack>
        </Box>
    );
}