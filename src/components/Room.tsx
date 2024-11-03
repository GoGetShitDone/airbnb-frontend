import { FaRegHeart, FaStar } from "react-icons/fa";
import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    pk: number;
}

export default function Room({
    pk,
    imageUrl,
    name,
    rating,
    city,
    country,
    price,
}: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"} spacing={2}>
                <Box 
                    position="relative" 
                    overflow={"hidden"} 
                    mb={2} 
                    rounded="2xl"
                    width="100%"
                    paddingBottom="100%"
                >
                    <Image 
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        src={imageUrl}
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <Button
                        variant={"unstyled"}
                        position="absolute"
                        top={2}
                        right={2}
                        color="white"
                        zIndex={1}
                    >
                    <Box
                        position="absolute"
                        top="4px"
                        right="4px"
                        color="white"
                        zIndex={1}
                    >
                        <FaRegHeart size="16px" />
                    </Box>
                    </Button>
                </Box>
                <Box width="100%">
                    <Grid gap={1} templateColumns={"5fr 1fr"}>
                        <Text as="b" noOfLines={1} fontSize="sm">
                            {name}
                        </Text>
                        <HStack spacing={1} alignItems="center">
                            <FaStar size={10} />
                            <Text fontSize={"xs"}>{rating}</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize={"xs"} color={gray}>
                        {city}, {country}
                    </Text>
                    <Text fontSize={"xs"} color={gray}>
                    <Text as="b">${price}</Text> / night
                </Text>
                </Box>
            </VStack>
        </Link>
    );
}


// import { FaRegHeart, FaStar } from "react-icons/fa";
// import {
//     Box,
//     Button,
//     Grid,
//     HStack,
//     Image,
//     Text,
//     useColorModeValue,
//     VStack,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// interface IRoomProps {
//     imageUrl: string;
//     name: string;
//     rating: number;
//     city: string;
//     country: string;
//     price: number;
//     pk: number;
// }

// export default function Room({
//     pk,
//     imageUrl,
//     name,
//     rating,
//     city,
//     country,
//     price,
// }: IRoomProps) {
//     const gray = useColorModeValue("gray.600", "gray.300");
//     return (
//         <Link to={`/rooms/${pk}`}>
//             <VStack alignItems={"flex-start"}>
//                 {/* Box 컴포넌트 수정사항:
//                     1. width="100%" 추가: 부모 요소의 전체 너비 사용
//                     2. paddingBottom 추가: 이미지 비율 3:2로 고정 */}
//                 <Box 
//                     position="relative" 
//                     overflow={"hidden"} 
//                     mb={3} 
//                     rounded="2xl"
//                     width="100%"  // 추가됨
//                     paddingBottom="100%"  // 추가됨 - 3:2 비율 (75%는 4:3, 56.25%는 16:9)
//                 >
//                     {/* Image 컴포넌트 수정사항:
//                         1. position="absolute" 및 top, left 추가: 부모 Box 내에서 절대 위치
//                         2. width, height 100% 설정: 부모 Box 크기에 맞춤
//                         3. objectFit, objectPosition 추가: 이미지 비율 유지 및 중앙 정렬
//                         4. 기존의 minH 속성 제거 */}
//                     <Image 
//                         position="absolute"  // 추가됨
//                         top={0}  // 추가됨
//                         left={0}  // 추가됨
//                         width="100%"  // 추가됨
//                         height="100%"  // 추가됨
//                         src={imageUrl}
//                         objectFit="cover"  // 추가됨
//                         objectPosition="center"  // 추가됨
//                     />
//                     {/* Button 컴포넌트 수정사항:
//                         1. top, right 값 수정: 여백 추가
//                         2. zIndex 추가: 이미지 위에 표시되도록 설정 */}
//                     <Button
//                         variant={"unstyled"}
//                         position="absolute"
//                         top={2}  // 수정됨 (0에서 2로)
//                         right={2}  // 수정됨 (0에서 2로)
//                         color="white"
//                         zIndex={1}  // 추가됨
//                     >
//                         <FaRegHeart size="20px" />
//                     </Button>
//                 </Box>
//                 {/* Box 컴포넌트 수정사항:
//                     1. width="100%" 추가: 텍스트 영역이 전체 너비 사용하도록 설정 */}
//                 <Box width="100%">  
//                     <Grid gap={2} templateColumns={"6fr 1fr"}>
//                         <Text display={"block"} as="b" noOfLines={1} fontSize="md">
//                             {name}
//                         </Text>
//                         <HStack spacing={1} alignItems="center">
//                             <FaStar size={12} />
//                             <Text fontSize={"sm"}>{rating}</Text>
//                         </HStack>
//                     </Grid>
//                     <Text fontSize={"sm"} color={gray}>
//                         {city}, {country}
//                     </Text>
//                 </Box>
//                 <Text fontSize={"sm"} color={gray}>
//                     <Text as="b">${price}</Text> / night
//                 </Text>
//             </VStack>
//         </Link>
//     );
// }
