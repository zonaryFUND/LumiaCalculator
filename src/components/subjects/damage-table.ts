import { WeaponTypeID } from "app-types/equipment/weapon"
import { WeaponID } from "app-types/equipment/weapon/id"
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio"
import { IntlShape } from "react-intl"
import { UniqueValueStrategy } from "./unique-value-strategy"
import { DamageTableUnit } from "app-types/damage-table/unit"

export type SubjectDamageTableUnit = Omit<DamageTableUnit, "value" | "triggeredOnBasicAttack"> & {
    value: ValueRatio | UniqueValueStrategy
    
    skill: "Q" | "W" | "E" | "R" | "T"
}

/*
export type SubjectDamageTableUnit = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | {tacticalLevel: number} | "other"
    value: ValueRatio | UniqueValueStrategy

    //type?: "heal" | "shield" | "ms" | "true" | "count" | "basic" | "basic-nocrit" | "critical" | "summoned" | "ratio" | "kenneth-heal" // "critical" in basicattack means confirmed critical, and that in skill means it is able to critical basic attack damage
    //type?: "kenneth-heal" // "critical" in basicattack means confirmed critical, and that in skill means it is able to critical basic attack damage
    type?: BasicAttackType | TrueDamageType | SupportType | MiscValueType   // undefined means standard skill damage
    damageDependent?: number | number[] // Recovery amounts dependent on the damage dealt, and it is only displayed on Combat page.
    multiplier?: number | number[] | ({
        name: string, 
        value: number | number[]
    })[]
}
    */

export type DamageTableGenerator = (props: {config: SubjectConfig, status: Status, intl: IntlShape}) => DamageTable;

export type BasicAttackElement = SubjectDamageTableUnit | "standard" | "disable-critical"

export type DamageTable = {
    basicAttack: BasicAttackElement[]
    skill: SubjectDamageTableUnit[][]
}

export type WeaponSkillTableGenerator = (props: {intl: IntlShape}) => DamageTableUnit[];

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    const tableOrGenerator = context(path).default;
    if (typeof tableOrGenerator == "function") {
        skills[key] = tableOrGenerator;     
    } else {
        skills[key] = () => tableOrGenerator;
    }
    
    return skills;
}, {}) as {[id: string]: (DamageTableGenerator)}

const weaponSkillContext = require.context("./", true, /\.\/weapon-skills\/damage-table\/.*\.ts/);
export const WeaponSkillDamageTable = weaponSkillContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const name = pathComponents[pathComponents.length - 1];
    const tableOrGenerator = weaponSkillContext(path).default;
    if (typeof tableOrGenerator == "function") {
        skills[name.substring(0, name.length - 3)] = tableOrGenerator;
    } else {
        skills[name.substring(0, name.length - 3)] = () => tableOrGenerator;
    }

    return skills;
}, {}) as {[id: string]: WeaponSkillTableGenerator}
