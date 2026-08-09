import axios from "axios";
import fs from "fs";
import yargs from "yargs/yargs";
import { APIKey } from "./credentials";
import * as es from "es-toolkit";
import { EquipmentBaseStatus } from "../src/types/app-types/equipment";
import { BaseURL, FetchAPIResponse } from "./fetch";

const argv = yargs(process.argv)
    .command("update-values", "fetch version-dependent data")
    .command("jp", "fetch japanese language data")
    .parseSync();

const jsonDir = "./src/params-json/nimbleapi";

const dummyStatusForKeys: Record<keyof EquipmentBaseStatus, 0> = {
        attackPower: 0,
        attackPowerByLv: 0,
        defense: 0,
        skillAmp: 0,
        skillAmpByLevel: 0,
        skillAmpRatio: 0,
        adaptiveForce: 0,
        maxHp: 0,
        maxHpByLv: 0,
        maxSp: 0,
        hpRegenRatio: 0,
        spRegenRatio: 0,
        attackSpeedRatio: 0,
        criticalStrikeChance: 0,
        criticalStrikeDamage: 0,
        cooldownReduction: 0,
        lifeSteal: 0,
        normalLifeSteal: 0,
        moveSpeed: 0,
        moveSpeedRatio: 0,
        sightRange: 0,
        increaseBasicAttackDamageRatioByLv: 0,
        penetrationDefense: 0,
        penetrationDefenseRatio: 0,
        slowResistRatio: 0,
        healerGiveHpHealRatio: 0,
        uniqueAttackRange: 0,
        uniqueTenacity: 0,
        uniqueSkillAmpRatio: 0,
        ultCooldownReduction: 0,
        weaponCooldownReduction: 0,
        tacticalCooldownReduction: 0
}
const equipmentStatusKeys = Object.keys(dummyStatusForKeys);

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
                    ...es.pick(zeroRemoved, [...equipmentStatusKeys, "code", "weaponType", "itemGrade"]),
                    ...(zeroRemoved.makeMaterial2 == 401405 ? { shard: "red" } : {}),
                    ...(zeroRemoved.makeMaterial2 == 401406 ? { shard: "blue" } : {})
                }
            });
    });
    await new Promise(resolve => setTimeout(resolve, 1000))
    await FetchAPIResponse("v2/data/ItemArmor", `${jsonDir}/armor.json`, data => {
        return data
            .filter((entry: any) => entry.itemGrade == "Epic" || entry.itemGrade == "Legend" || entry.itemGrade == "Mythic")
            // 201517は天上の響き、ただし201516にもある
            // 201516をjsonデータに採用、プリヤ以外が装備できないようにする処理は201516を基準に行う
            .filter((entry: any) => entry.code != 201517)
            .map((entry: any) => {
                const zeroRemoved = es.pickBy(entry, (value) => value != 0);
                return {
                    ...es.pick(zeroRemoved, [...equipmentStatusKeys, "code", "armorType", "itemGrade"]),
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
}  else if (argv._[2] == "kr") {
    const response = await axios.get(`${BaseURL}v1/l10n/Korean`, {
        headers: {
            accept: "application/json",
            "x-api-key": APIKey
        }
    });
    const url = response.data.data.l10Path;
    const file = await axios.get(url);
    fs.writeFileSync("./kr.txt", file.data, "utf-8");
}