import axios from "axios";
import fs from "fs";
import yargs from "yargs/yargs";
import { APIKey } from "credentials";
import * as es from "es-toolkit";

const baseURL = "https://open-api.bser.io/";

async function callAPI(path: string, writeTo: string) {
    try {
        const response = await axios.get(`${baseURL}${path}`, {
            headers: {
                accept: "application/json",
                "x-api-key": APIKey
            }
        })

        fs.writeFileSync(writeTo, JSON.stringify(response.data.data, null, 4), "utf-8");
    } catch (error) {
        console.error(error);
    }
}

const argv = yargs(process.argv)
    .command("subject", "fetch subject data")
    .command("mastery", "fetch mastery data")
    .command("jp", "fetch japanese language data")
    .parseSync();

if (argv._[2] == "subject") {
    await callAPI("v2/data/Character", "./src/dictionary-jsons/base-status.json");
    await callAPI("v2/data/CharacterLevelUpStat", "./src/dictionary-jsons/levelup-status.json");
    await callAPI("v2/data/MasteryStat", "./src/dictionary-jsons/mastery.json");
} else if (argv._[2] == "weapon-status") {
    await callAPI("v2/data/WeaponTypeInfo", "./src/dictionary-jsons/weapon-type-status.json");
} else if (argv._[2] == "armor") {
    const response = await axios.get(`${baseURL}v2/data/ItemArmor`, {
        headers: {
            accept: "application/json",
            "x-api-key": APIKey
        }
    });

    const data = response.data.data
        .filter((entry: any) => entry.itemGrade == "Epic" || entry.itemGrade == "Legend" || entry.itemGrade == "Mythic")
        .filter((entry: any) => entry.modeType == 0)
        .map((entry: any) => {
            const zeroRemoved = es.pickBy(entry, (value) => value != 0);
            const unwantedKeys = [
                "name", "itemType", "isCompletedItem", "markingType", 
                "gradeBgOverride", "makeCustomAction",
                "alertInSpectator", "isRemovedFromPlayerCorpseInventoryWhenPlayerKilled",
                "craftAnimTrigger", "stackable", "initialCount", "itemUsableType", 
                "makeMaterial1", "makeMaterial2", "restoreItemWhenResurrected", "autoDisappear",
                "creditValueWhenConvertedToBounty"
            ]
            return es.omit(zeroRemoved, unwantedKeys);
        });
    
    fs.writeFileSync("./src/dictionary-jsons/armor.json", JSON.stringify(data, null, 4), "utf-8");
} else if (argv._[2] == "weapon") {
    try {
        const response = await axios.get(`${baseURL}v2/data/ItemWeapon`, {
            headers: {
                accept: "application/json",
                "x-api-key": APIKey
            }
        });

        const data = response.data.data
            .filter((entry: any) => entry.itemGrade == "Epic" || entry.itemGrade == "Legend" || entry.itemGrade == "Mythic")
            .filter((entry: any) => entry.modeType == 0)
            .map((entry: any) => {
                const zeroRemoved = es.pickBy(entry, (value) => value != 0);
                const unwantedKeys = [
                    "name", "itemType", "isCompletedItem", "markingType", 
                    "gradeBgOverride", "makeCustomAction",
                    "alertInSpectator", "isRemovedFromPlayerCorpseInventoryWhenPlayerKilled",
                    "craftAnimTrigger", "stackable", "initialCount", "itemUsableType", 
                    "makeMaterial1", "makeMaterial2", "restoreItemWhenResurrected", "autoDisappear",
                    "creditValueWhenConvertedToBounty"
                ]
                return es.omit(zeroRemoved, unwantedKeys);
            });
        
        fs.writeFileSync("./src/dictionary-jsons/weapon.json", JSON.stringify(data, null, 4), "utf-8");
    } catch (error) {
        console.error(error);
    }
} else if (argv._[2] == "jp") {
    const response = await axios.get(`${baseURL}v1/l10n/Japanese`, {
        headers: {
            accept: "application/json",
            "x-api-key": APIKey
        }
    });
    const url = response.data.data.l10Path;
    const file = await axios.get(url);
    fs.writeFileSync("./jp", file.data, "utf-8");
}