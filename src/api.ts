import Cookie from "js-cookie";
import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});


export const getRooms = () =>
    instance.get("rooms/").then((response) => response.data);


export const getRoom = async (roomPk: string | undefined) => {
    if (!roomPk) throw new Error("Room PK is required");
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};


export const getRoomReviews = async (roomPk: string | undefined) => {
    if (!roomPk) throw new Error("Room PK is required");
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
};


export const getMe = () =>
    instance.get(`users/me`).then((response) => response.data);


export const logOut = () =>
    instance
        .post(`users/logout`, null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    })
    .then((response) => response.data);


    export const githubLogIn = (code: string) =>
        instance
            .post(
                `/users/github`,
                { code },
                {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
                }
            )
            .then((response) => response.status);