import { FaComment, FaGithub } from "react-icons/fa";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

const CLIENT_ID = "Iv23liBIYifqisaoJzr9";
const SCOPE = "user user:email";
const githubURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

export default function SocialLogin() {
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
        <Button
            as="a"
            href={githubURL}
            w="100%"
            leftIcon={<FaGithub />}
        >
            Continue with Github
        </Button>
        <Button w="100%" leftIcon={<FaComment />} colorScheme={"yellow"}>
            Continue with Kakao
        </Button>
        </VStack>
    </Box>
    );
}