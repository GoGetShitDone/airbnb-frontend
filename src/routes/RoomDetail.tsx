import {
    Avatar,
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";


export default function RoomDetail() {
    const { roomPk } = useParams();

    const { isLoading, data } = useQuery<IRoomDetail>({
        queryKey: ["rooms", roomPk],
        queryFn: () => getRoom(roomPk),
        enabled: !!roomPk,
    });
    
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>({
        queryKey: ["rooms", roomPk, "reviews"],
        queryFn: () => getRoomReviews(roomPk),
        enabled: !!roomPk,
    });

    // 리뷰 로딩 상태 활용
    if (isLoading || isReviewsLoading) {
        return <Skeleton height="100px" />;
    }

    // console.log("Room data:", data);

    return (
        <Box
            pb={40}
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
        <Skeleton height={"43px"} width="50%" isLoaded={!isLoading}>
            <Heading>{data?.name}</Heading>
        </Skeleton>
        <Grid
            mt={8}
            rounded="xl"
            overflow={"hidden"}
            gap={2}
            height="60vh"
            templateRows={"1fr 1fr"}
            templateColumns={"repeat(4, 1fr)"}
        >
            {[0, 1, 2, 3, 4].map((index) => (
                <GridItem
                    colSpan={index === 0 ? 2 : 1}
                    rowSpan={index === 0 ? 2 : 1}
                    overflow={"hidden"}
                    key={index}
                >
                    <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                        {data?.photos[index] ? (
                            <Image
                                objectFit={"cover"}
                                w="100%"
                                h="100%"
                                src={data.photos[index].file}
                            />
                        ) : (
                            // 사진이 없는 경우 회색 배경의 빈 박스 표시
                            <Box 
                                w="100%" 
                                h="100%" 
                                bg="gray.200"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color="gray.500">No Image</Text>
                            </Box>
                        )}
                    </Skeleton>
                </GridItem>
            ))}
        </Grid>
        <HStack width={"50%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
            <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"xl"}>
                House hosted by {data?.owner.name}
                </Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                </Text>
                <Text>∙</Text>
                <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                </Text>
                </HStack>
            </Skeleton>
            </VStack>
            <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
        </HStack>
            <Box mt={10}>
                <Heading mb={5} fontSize={"2xl"}>
                    <HStack>
                        <FaStar /> <Text>{data?.rating}</Text>
                        <Text>∙</Text>
                        <Text>
                        {reviewsData?.length || 0} review{(reviewsData?.length || 0) === 1 ? "" : "s"}
                        </Text>
                    </HStack>
                </Heading>
                <Container mt={16} maxW="container.lg" marginX="none">
                    <Grid gap={10} templateColumns={"1fr 1fr"}>
                        {reviewsData?.map((review, index) => (
                        <VStack alignItems={"flex-start"} key={index}>
                            <HStack>
                            <Avatar
                                name={review.user.name}
                                src={review.user.avatar}
                                size="md"
                            />
                            <VStack spacing={0} alignItems={"flex-start"}>
                                <Heading fontSize={"md"}>{review.user.name}</Heading>
                                <HStack spacing={1}>
                                <FaStar size="12px" />
                                <Text>{review.rating}</Text>
                                </HStack>
                            </VStack>
                            </HStack>
                            <Text>{review.payload}</Text>
                        </VStack>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}