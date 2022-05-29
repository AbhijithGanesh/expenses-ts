import {sign} from "jsonwebtoken";
import type { Algorithm } from "jsonwebtoken";
import type payload from "../types/utils";
import { BaseUser } from "../types/users";

let generate_token =  (user: BaseUser): string => {
    let sign_options =  {
        algorithm: process.env?.ALGORITHM as Algorithm,
        expiresIn: process.env?.expiry,
    };
    const Payload: payload = {
        tag: "Username",
        user_object:`${user}`,
    }
    return sign(Payload, process.env?.KEY as string,sign_options)
}

export default generate_token;