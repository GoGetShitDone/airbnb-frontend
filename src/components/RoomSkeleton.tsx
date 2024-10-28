import { Box, HStack, Skeleton } from "@chakra-ui/react";
export default function RoomSkeleton() {
    return (
        <Box>
            <Skeleton rounded="2xl" height={"240px"} mb={6} />
            <HStack justifyContent={"space-between"}>
                <Skeleton rounded="lg" width="60%" height={3} mb={1} />
                <Skeleton rounded="lg" width="20%" height={3} />
            </HStack>
            <Skeleton rounded="lg" width="40%" height={3} mb={1} />
            <Skeleton rounded="lg" width="30%" height={3} mb={2} />
            <Skeleton rounded="lg" width="25%" height={3} />
        </Box>
    );
}