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
            `users/github`,
            { code },
            {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
            }
        )
        .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
    instance
        .post(
            `users/kakao`,
            { code },
            {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
            }
        )
        .then((response) => response.status);


export interface IUsernameLoginVariables {
    username: string;
    password: string;
}


export interface IUsernameLoginSuccess {
    ok: string;
}


export interface IUsernameLoginError {
    error: string;
}


export const usernameLogIn = ({
    username,
    password,
}: IUsernameLoginVariables) =>
    instance
        .post(
            `users/log-in`,
            { username, password },
            {
                headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);


export interface ISignUpVariables {
    name: string;
    email: string;
    username: string;
    password: string;
}


export interface ISignUpSuccess {
    ok: string;
}


export interface ISignUpError {
    error: string;
}


export const signUp = (variables: ISignUpVariables) =>
    instance
        .post(
            `/users/signup`,
            variables,
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => response.data);


export const getAmenities = () =>
    instance.get(`rooms/amenities`).then((response) => response.data);


export const getCategories = () =>
    instance.get(`categories`).then((response) => response.data);


export interface IUploadRoomVariables {
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: boolean;
    kind: string;
    amenities: number[];
    category: number;
}


export const uploadRoom = (variables: IUploadRoomVariables) => {
    console.log("Sending data to server:", variables);  // 서버로 보내는 데이터 확인
    return instance
        .post(`rooms/`, variables, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => {
            console.log("Server response:", response.data);  // 서버 응답 확인
            return response.data;
        });
};