import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Textarea,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import {
    getAmenities,
    getCategories,
    IUploadRoomVariables,
    uploadRoom,
} from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useNavigate } from "react-router-dom";

export default function UploadRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
    const toast = useToast();
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: uploadRoom,
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room created!",
                description: "Successfully created new room",
                position: "bottom-right",
            });
            const roomId = data.id || data.pk;
            if (roomId) {
                navigate(`/rooms/${roomId}`);
            }
        },
        onError: (error: any) => {
            console.error("Upload error:", error);
            toast({
                status: "error",
                title: "Failed to create room",
                description: "Please try again",
                position: "bottom-right",
            });
        },
    });

    const { data: amenities } = useQuery<IAmenity[]>({
        queryKey: ["amenities"],
        queryFn: getAmenities,
    });

    const { data: categories } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    useHostOnlyPage();

    const onSubmit = (data: IUploadRoomVariables) => {
        // 선택된 amenities가 없으면 빈 배열로 설정
        const validAmenities = selectedAmenities.filter(id => id !== null && id !== undefined);
        
        const formData = {
            ...data,
            price: Number(data.price),
            rooms: Number(data.rooms),
            toilets: Number(data.toilets),
            category: Number(data.category),
            amenities: validAmenities
        };
        
        console.log("Submitting data:", formData);
        mutation.mutate(formData);
    };

    const handleAmenityChange = (amenityPk: number, isChecked: boolean) => {
        console.log("Handling amenity change:", { amenityPk, isChecked });
        
        setSelectedAmenities(prev => {
            const newSelection = isChecked 
                ? [...prev, amenityPk]
                : prev.filter(id => id !== amenityPk);
            
            console.log("New selection:", newSelection);
            return newSelection;
        });
    };


    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                <Container>
                    <Heading textAlign={"center"}>Upload Room</Heading>
                    <VStack spacing={10} as="form" onSubmit={handleSubmit(onSubmit)} mt={5}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...register("name", { required: true })} required type="text" />
                            <FormHelperText>Write the name of your room.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input {...register("country", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input {...register("city", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input {...register("address", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaMoneyBill />} />
                                <Input {...register("price", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input {...register("rooms", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input {...register("toilets", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...register("description", { required: true })} />
                        </FormControl>
                        <FormControl>
                            <Checkbox {...register("pet_friendly")}>Pet friendly?</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select {...register("kind", { required: true })} placeholder="Choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_room">Private Room</option>
                                <option value="shared_room">Shared Room</option>
                            </Select>
                            <FormHelperText>What kind of room are you renting?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select
                                {...register("category", { required: true, valueAsNumber: true })}
                                placeholder="Choose a category"
                            >
                                {categories?.map((category) => (
                                    <option key={category.pk} value={category.pk}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            <FormHelperText>What category describes your room?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map((amenity) => {
                                    const isSelected = selectedAmenities.includes(amenity.pk);
                                    return (
                                        <Box key={amenity.pk}>
                                            <Checkbox
                                                isChecked={isSelected}
                                                onChange={(e) => handleAmenityChange(amenity.pk, e.target.checked)}
                                            >
                                                {amenity.name}
                                            </Checkbox>
                                            <FormHelperText>{amenity.description}</FormHelperText>
                                        </Box>
                                    );
                                })}
                            </Grid>
                        </FormControl>
                        {mutation.isError ? <Text color="red.500">Something went wrong</Text> : null}
                        <Button
                            type="submit"
                            isLoading={mutation.isPending}
                            colorScheme={"red"}
                            size="lg"
                            w="100%"
                        >
                            Upload Room
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}
