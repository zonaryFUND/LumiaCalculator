import axios from "axios";
import fs from "fs";
import yargs from "yargs/yargs";
import { APIKey } from "./credentials";
import * as es from "es-toolkit";
import { EquipmentStatusKeys } from "../src/types/app-types/equipment";
import { BaseURL, FetchAPIResponse } from "./fetch";

const argv = yargs(process.argv)
    .command("update-values", "fetch version-dependent data")
    .command("jp", "fetch japanese language data")
    .parseSync();

const jsonDir = "./src/ingame-params/json"

if (argv._[2] == "update-values") {
    await FetchAPIResponse("v2/data/Character", `${jsonDir}/base-status.json`);
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/CharacterLevelUpStat", `${jsonDir}/levelup-status.json`);
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/MasteryStat", `${jsonDir}/mastery.json`);
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/WeaponTypeInfo", `${jsonDir}/weapon-type-status.json`);
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/ItemWeapon", `${jsonDir}/weapon.json`, data => {
        return data
            .filter((entry: any) => entry.itemGrade == "Epic" || entry.itemGrade == "Legend" || entry.itemGrade == "Mythic")
            .filter((entry: any) => entry.modeType == 0)
            .map((entry: any) => {
                const zeroRemoved = es.pickBy(entry, (value) => value != 0);
                return {
                    ...es.pick(zeroRemoved, [...EquipmentStatusKeys, "code", "weaponType", "itemGrade"]),
                    ...(zeroRemoved.makeMaterial2 == 401405 ? { shard: "red" } : {}),
                    ...(zeroRemoved.makeMaterial2 == 401406 ? { shard: "blue" } : {})
                }
            });
    });
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/ItemArmor", `${jsonDir}/armor.json`, data => {
        return data
            .filter((entry: any) => entry.itemGrade == "Epic" || entry.itemGrade == "Legend" || entry.itemGrade == "Mythic")
            .filter((entry: any) => entry.modeType == 0)
            .map((entry: any) => {
                const zeroRemoved = es.pickBy(entry, (value) => value != 0);
                return {
                    ...es.pick(zeroRemoved, [...EquipmentStatusKeys, "code", "armorType", "itemGrade"]),
                    ...(zeroRemoved.upgradeItemCode ? { david: { to: zeroRemoved.upgradeItemCode } } : {}),
                    ...(zeroRemoved.markingType == "Upgrade" ? { david: { from: zeroRemoved.makeMaterial1 } } : {})
                }
            });
    });
} else if (argv._[2] == "jp") {
    const response = await axios.get(`${BaseURL}v1/l10n/Japanese`, {
        headers: {
            accept: "application/json",
            "x-api-key": APIKey
        }
    });
    const url = response.data.data.l10Path;
    const file = await axios.get(url);
    fs.writeFileSync("./jp.txt", file.data, "utf-8");
}