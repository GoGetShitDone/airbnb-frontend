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
    useToast,
    VStack,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";

export default function RoomDetail() {

    const { roomPk } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [dates, setDates] = useState<Value>();

    // 모든 색상값을 여기서 선언
    const headerBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const contentBg = useColorModeValue("white", "gray.800");
    const subTextColor = useColorModeValue("gray.500", "gray.400");
    const descriptionColor = useColorModeValue("gray.600", "gray.400");
    const calendarBg = useColorModeValue("white", "gray.800");
    const calendarBorderColor = useColorModeValue("gray.100", "gray.700");
    const calendarTileNowBg = useColorModeValue('#E5E5EA', '#2D3748');
    const calendarTextColor = useColorModeValue('black', 'white');
    const reviewTextColor = useColorModeValue("gray.600", "gray.400");
    const buttonBg = useColorModeValue("white", "gray.800");
    const buttonBorderColor = useColorModeValue("gray.100", "gray.700");



    const { isLoading, data } = useQuery<IRoomDetail>({
        queryKey: ["rooms", roomPk],
        queryFn: () => getRoom(roomPk),
        enabled: !!roomPk,
        retry: 1,
    });
    
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>({
        queryKey: ["rooms", roomPk, "reviews"],
        queryFn: () => getRoomReviews(roomPk),
        enabled: !!roomPk,
    });

    // roomPk가 없는 경우 처리
    if (!roomPk) {
        navigate("/");
        return null;
    }

    // 로딩 상태
    if (isLoading || isReviewsLoading) {
        return (
            <Box
                pb={10}
                mt={10}
                px={{
                    base: 10,
                    lg: 40,
                }}
            >
                <Skeleton height="43px" width="50%" />
                <Grid
                    mt={8}
                    gap={2}
                    height="60vh"
                    templateRows={"1fr 1fr"}
                    templateColumns={"repeat(4, 1fr)"}
                >
                    {[0, 1, 2, 3, 4].map((index) => (
                        <GridItem
                            key={index}
                            colSpan={index === 0 ? 2 : 1}
                            rowSpan={index === 0 ? 2 : 1}
                        >
                            <Skeleton h="100%" w="100%" />
                        </GridItem>
                    ))}
                </Grid>
                <Skeleton height="100px" mt={10} />
            </Box>
        );
    }

    // 데이터가 없는 경우
    if (!data) {
        toast({
            status: "error",
            title: "Room not found",
            description: "The requested room could not be found",
            position: "bottom-right",
        });
        navigate("/");
        return null;
    }

    const onDateChange = (value: Value) => {
        setDates(value);
        if (value instanceof Array) {
            console.log("Check in:", value[0]);
            console.log("Check out:", value[1]);
        }
    };

    return (
        <Box position="relative" height="100vh" overflow="hidden">
            {/* Fixed Header */}
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
                py={4}
                px={4}
            >
                <Container maxW="container.xl">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Button 
                            variant="ghost" 
                            leftIcon={<FaChevronLeft />}
                            onClick={() => navigate(-1)}
                            size="sm"
                            rounded="full"
                            fontSize="sm"
                        >
                            Back
                        </Button>
                        <Heading 
                            fontSize="md" 
                            fontWeight="600"
                            maxW="200px"
                            isTruncated
                        >
                            {data?.name}
                        </Heading>
                        <Box w="40px" />
                    </HStack>
                </Container>
            </Box>

            {/* Scrollable Content */}
            <Box 
                position="relative"
                height="100%"
                overflowY="auto"
                pt="72px"
                pb="80px"
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    'msOverflowStyle': 'none',
                    'scrollbarWidth': 'none',
                }}
            >
                {/* Image Slider */}
                <Box
                    overflow="hidden"
                    position="relative"
                    height={{ base: "300px", md: "60vh" }}
                    borderRadius={{ base: "0", md: "2xl" }}
                    mx={{ base: 0, md: 4 }}
                    mt={4}
                >
                    <Box
                        overflowX="auto"
                        overflowY="hidden"
                        whiteSpace="nowrap"
                        height="100%"
                        css={{
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            'scrollSnapType': 'x mandatory',
                            'scrollBehavior': 'smooth',
                        }}
                    >
                        {data.photos?.map((photo, index) => (
                            <Box
                                key={index}
                                display="inline-block"
                                w="100%"
                                h="100%"
                                flexShrink={0}
                                css={{
                                    'scrollSnapAlign': 'start'
                                }}
                            >
                                <Image
                                    objectFit="cover"
                                    w="100%"
                                    h="100%"
                                    src={photo.file}
                                    alt={`Room photo ${index + 1}`}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Image Indicators */}
                    <HStack 
                        position="absolute" 
                        bottom={8} 
                        width="100%" 
                        justify="center" 
                        spacing={2}
                    >
                        {data.photos?.map((_, index) => (
                            <Box
                                key={index}
                                w="6px"
                                h="6px"
                                borderRadius="full"
                                bg="white"
                                opacity={0.8}
                                shadow="lg"
                            />
                        ))}
                    </HStack>
                </Box>

                {/* Content Section */}
                <Box 
                    bg={contentBg}
                    borderTopRadius="16px" 
                    mt="-20px" 
                    position="relative" 
                    zIndex={2}
                    px={4} 
                    pt={6}
                >
                    <VStack spacing={6} align="stretch">
                        {/* Host Info */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack spacing={3}>
                                <Avatar 
                                    name={data?.owner.name} 
                                    size="md" 
                                    src={data?.owner.avatar} 
                                />
                                <VStack spacing={0} alignItems="flex-start">
                                    <Heading fontSize="md">{data?.owner.name}</Heading>
                                    <Text fontSize="sm" color={subTextColor}>Host</Text>
                                </VStack>
                            </HStack>
                            <Button 
                                variant="outline" 
                                size="sm"
                                rounded="full"
                            >
                                Contact Host
                            </Button>
                        </HStack>

                        {/* Room Info */}
                        <VStack align="flex-start" spacing={2}>
                            <HStack spacing={2}>
                                <Text fontSize="md" fontWeight="500">
                                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                                </Text>
                                <Text>•</Text>
                                <Text fontSize="md" fontWeight="500">
                                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                                </Text>
                            </HStack>
                            <Text color={descriptionColor}>
                                {data?.description}
                            </Text>
                        </VStack>

                        {/* Calendar */}
                        <Box 
                            bg={calendarBg}
                            rounded="xl" 
                            shadow="sm"
                            border="1px solid"
                            borderColor={calendarBorderColor}
                            p={4}
                            sx={{
                                '.react-calendar': {
                                    width: '100%',
                                    border: 'none',
                                    background: 'transparent',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                },
                                '.react-calendar__tile': {
                                    padding: '1em 0.5em',
                                    borderRadius: '10px',
                                    fontSize: '0.9em',
                                },
                                '.react-calendar__tile--active': {
                                    background: '#007AFF !important',
                                    borderRadius: '10px',
                                    color: 'white',
                                },
                                '.react-calendar__tile--now': {
                                    background: calendarTileNowBg,
                                    borderRadius: '10px',
                                },
                                '.react-calendar__navigation': {
                                    marginBottom: '1em',
                                },
                                '.react-calendar__navigation button': {
                                    minWidth: '44px',
                                    background: 'none',
                                    fontSize: '1em',
                                    borderRadius: '8px',
                                    color: calendarTextColor,
                                },
                                '.react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd': {
                                    background: '#007AFF !important',
                                    color: 'white',
                                    borderRadius: '10px',
                                },
                                '.react-calendar__tile--rangeBetween': {
                                    background: '#E5F1FF !important',
                                    color: '#007AFF',
                                },
                            }}
                        >
                            <Calendar
                                onChange={onDateChange}
                                value={dates}
                                prev2Label={null}
                                next2Label={null}
                                minDetail="month"
                                minDate={new Date()}
                                maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
                                selectRange
                            />
                        </Box>

                        {/* Reviews */}
                        <Box>
                            <HStack mb={4} spacing={2}>
                                <FaStar />
                                <Text fontWeight="600">{data?.rating}</Text>
                                <Text color={subTextColor}>
                                    ({reviewsData?.length || 0} reviews)
                                </Text>
                            </HStack>
                            <VStack spacing={4} align="stretch">
                                {reviewsData?.slice(0, 3).map((review, index) => (
                                    <HStack key={index} spacing={3} align="start">
                                        <Avatar
                                            name={review.user.name}
                                            src={review.user.avatar}
                                            size="sm"
                                        />
                                        <VStack spacing={1} align="start">
                                            <Text fontWeight="500">
                                                {review.user.name}
                                            </Text>
                                            <Text 
                                                fontSize="sm" 
                                                color={reviewTextColor}
                                            >
                                                {review.payload}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                ))}
                                {(reviewsData?.length || 0) > 3 && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        rounded="full"
                                    >
                                        View all reviews
                                    </Button>
                                )}
                            </VStack>
                        </Box>
                    </VStack>
                </Box>
            </Box>

            {/* Fixed Bottom Button */}
            <Box 
                position="fixed"
                bottom={0}
                left={0}
                right={0}
                bg={buttonBg}
                borderTop="1px solid"
                borderColor={buttonBorderColor}
                p={4}
                zIndex={100}
            >
                <Button 
                    w="100%" 
                    colorScheme="blue"
                    size="lg"
                    rounded="full"
                    h="56px"
                >
                    Reserve Now
                </Button>
            </Box>
        </Box>
    );
}