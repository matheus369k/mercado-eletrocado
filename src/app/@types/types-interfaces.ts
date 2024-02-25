import React, { Dispatch, SetStateAction } from "react";

export type PropsCheck = {
    setCheckOutBtn: Dispatch<SetStateAction<boolean>>;
}

export type PropsSucess = {
    setSuccessBuy: Dispatch<SetStateAction<boolean>>;
}

export type PropsSucessCheck = {
    setCheckOutBtn: Dispatch<SetStateAction<boolean>>;
    setSuccessBuy: Dispatch<SetStateAction<boolean>>;
}

export type PropsSetCheckSucceCheck = {
    setCheckOutBtn: Dispatch<SetStateAction<boolean>>;
    setSuccessBuy: Dispatch<SetStateAction<boolean>>;
    checkOutBtn: boolean;
}

export type ProductsInfor = {
    id: number;
    model: string;
    img: string;
    slide: {
        slide1: string;
        slide2: string;
        slide3: string;
    };
    screen: string;
    processor: string;
    memory: string;
    placeVideo?: string;
    battery?: string;
    price: number;
    stock: number;
    category: string;
}

export type CategoryProducts = {
    notebook: ProductsInfor[];
    tablet: ProductsInfor[];
    phone: ProductsInfor[];
}

export type Login = {
    email: string;
    password: string;
}

export type UserData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    cep: string;
}

export type HandleFunctionBtnProps = {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    eventBtn: string;
    productId: number;
}
