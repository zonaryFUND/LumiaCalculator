import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { APIKey } from "nn-api/credentials";

export const BaseURL = "https://open-api.bser.io/";

export async function FetchAPIResponse(
    path: string, 
    writeTo: string,
    modify?: (data: any) => any
) {
    try {
        const response = await axios.get(`${BaseURL}${path}`, {
            headers: {
                accept: "application/json",
                "x-api-key": APIKey
            }
        })

        const modifiedData = modify ? modify(response.data.data) : response.data.data;

        fs.writeFileSync(writeTo, JSON.stringify(modifiedData, null, 4), "utf-8");
    } catch (error) {
        console.error(error);
    }
}