import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {Box,} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root() {
    return (
        <Box>
            <Header />
            <Outlet />
            <ReactQueryDevtools />
        </Box>
    );
}