import { getMe } from './../api';
import { IUser } from "../types";
import { useQuery } from "@tanstack/react-query";


export default function useUser() {
    const { isLoading, data, isError } = useQuery<IUser>({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
    });

    
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}