import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface accessTokenData extends JwtPayload{ //make tokenData like JwtPayload as we will assign later to first below. As JwtPayload have other fields as well other than our custom fields so we need to inherit those.
    id: string,
    name: string,
    email: string,
};

export interface userType extends Document {
    name: string,
    email: string,
    password: string,
    refreshToken?: string
}

export type loginData = { email: string; password: string };
export type signupData = { name: string, email: string, password: string };