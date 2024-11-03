// routes/Home.tsx
import { 
    Box, 
    Container, 
    Grid, 
    VStack, 
    InputGroup, 
    InputLeftElement, 
    Input, 
    useColorModeValue,
    Tabs,
    TabList,
    Tab
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { IRoomList } from "../types";
import { FiSearch } from "react-icons/fi";

export default function Home() {
    const { isLoading, data } = useQuery<IRoomList[]>({
        queryKey: ["rooms"],
        queryFn: getRooms,
    });

    const inputBg = useColorModeValue("gray.50", "gray.800");
    const textColor = useColorModeValue("gray.900", "gray.100");

    return (
        <Box>
            {/* Search and Categories */}
            <Box 
                pt="24"
                pb="4"
                borderBottom="1px solid"
                borderColor="gray.200"
            >
                <Container maxW="container.xl">
                    <VStack spacing={4}>
                        <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none">
                                <FiSearch color="gray.500" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search rooms..."
                                bg={inputBg}
                                border="1px solid"
                                rounded="xl"
                            />
                        </InputGroup>
                        <Tabs variant="soft-rounded" colorScheme="red" w="full">
                            <TabList>
                                <Tab 
                                    mr={2}
                                    bg={inputBg}
                                    color={textColor}
                                    _selected={{ 
                                        color: "white",
                                        bg: "red.500"
                                    }}
                                >
                                    All
                                </Tab>
                                <Tab 
                                    mr={2}
                                    bg={inputBg}
                                    color={textColor}
                                    _selected={{ 
                                        color: "white",
                                        bg: "red.500"
                                    }}
                                >
                                    Popular
                                </Tab>
                                <Tab 
                                    mr={2}
                                    bg={inputBg}
                                    color={textColor}
                                    _selected={{ 
                                        color: "white",
                                        bg: "red.500"
                                    }}
                                >
                                    Trending
                                </Tab>
                            </TabList>
                        </Tabs>
                    </VStack>
                </Container>
            </Box>

            {/* Room Grid - 모바일 최적화 */}
            <Container maxW="container.xl" py={4}>
                <Grid
                    columnGap={2}
                    rowGap={4}
                    templateColumns={{
                        base: "repeat(3, 1fr)",  // 모바일 기본 3열
                        sm: "repeat(3, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(4, 1fr)",
                        "2xl": "repeat(5, 1fr)",
                    }}
                >
                    {isLoading ? (
                        <>
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                            <RoomSkeleton />
                        </>
                    ) : null}
                    {data?.map((room) => (
                        <Room
                            key={room.pk}
                            pk={room.pk}
                            imageUrl={room.photos[0]?.file}
                            name={room.name}
                            rating={room.rating}
                            city={room.city}
                            country={room.country}
                            price={room.price}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}




// import { Grid } from "@chakra-ui/react";
// import { useQuery } from "@tanstack/react-query";
// import { getRooms } from "../api";
// import Room from "../components/Room";
// import RoomSkeleton from "../components/RoomSkeleton";
// import { IRoomList } from "../types";


// export default function Home() {

//     const { isLoading, data } = useQuery<IRoomList[]>({
//         queryKey: ["rooms"],
//         queryFn: getRooms,
//     });
    
//     return (
//         <Grid
//             mt={10}
//             px={{
//                 base: 10,
//                 lg: 40,
//             }}
//             columnGap={4}
//             rowGap={8}
//             templateColumns={{
//                 sm: "1fr",
//                 md: "1fr 1fr",
//                 lg: "repeat(3, 1fr)",
//                 xl: "repeat(4, 1fr)",
//                 "2xl": "repeat(5, 1fr)",
//             }}
//         >
//         {isLoading ? (
//         <>
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//             <RoomSkeleton />
//         </>
//     ) : null}
//     {data?.map((room) => (
//         <Room
//             key={room.pk}
//             pk={room.pk}
//             imageUrl={room.photos[0]?.file}
//             name={room.name}
//             rating={room.rating}
//             city={room.city}
//             country={room.country}
//             price={room.price}
//         />
//     ))}
//     </Grid>
// );
// }