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

export type DamageTableGenerator = (props: {config: SubjectConfig, status: Status, intl: IntlShape}) => DamageTable;

export type BasicAttackElement = SubjectDamageTableUnit | "standard" | "disable-critical"

export type DamageTable = {
    basicAttack: BasicAttackElement[]
    skill: SubjectDamageTableUnit[][]
}

export type WeaponSkillTableGenerator = (props: {intl: IntlShape}) => DamageTableUnit[];

const subjectModules = import.meta.glob<{
    default: SubjectDamageTableUnit[][] | DamageTableGenerator
}>("./**/damage-table.ts", {eager: true});

export const SubjectDamageTable = Object.entries(subjectModules).reduce((skills, [key, m]) => {
    const subject = key.substring(2, key.lastIndexOf("/"));
    const tableOrGenerator = m.default;
    
    return {
        ...skills,
        [subject]: typeof tableOrGenerator == "function" ? tableOrGenerator : () => tableOrGenerator
    }
}, {}) as {[id: string]: (DamageTableGenerator)}

const weaponSkillModules = import.meta.glob<{
    default: DamageTableUnit[] | WeaponSkillTableGenerator
}>("./weapon-skills/damage-table/*.ts", {eager: true});

export const WeaponSkillDamageTable = Object.entries(weaponSkillModules).reduce((skills, [key, m]) => {
    const pathComponents = key.split("/");
    const name = pathComponents[pathComponents.length - 1];
    const tableOrGenerator = m.default;
    return {
        ...skills,
        [name.substring(0, name.length - 3)]:
            typeof tableOrGenerator == "function" ?
            tableOrGenerator :
            () => tableOrGenerator
    }
}, {} as {[id: string]: WeaponSkillTableGenerator})
