import axios from "axios";
import fs from "fs";
import yargs from "yargs/yargs";
import { APIKey } from "credentials";

const baseURL = "https://open-api.bser.io/v2";

async function subjects() {
    try {
        const response = await axios.get(`${baseURL}/data/Character`, {
            headers: {
                accept: "application/json",
                "x-api-key": APIKey
            }
        })

        fs.writeFileSync("./src/dictionary-jsons/status.json", JSON.stringify(response.data.data, null, 4), "utf-8");
    } catch (error) {
        console.error(error);
    }
}

const argv = yargs(process.argv).command("subject", "fetch subject data").parseSync();

if (argv._[2] == "subject") {
    await subjects()
}