import { WeaponTypeID } from "app-types/equipment/weapon"
import { WeaponID } from "app-types/equipment/weapon/id"
import { SkillLevels } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio"
import Decimal from "decimal.js"

type CalculatedBasicAttackValue = {
    base?: Decimal
    critical?: Decimal
    expected?: Decimal
}

type CalculatedValue = {
    value: Decimal
}

export type Value = ValueRatio | CalculatedBasicAttackValue | CalculatedValue

export type SkillValueProps = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item"
    value: ValueRatio | CalculatedBasicAttackValue | CalculatedValue
    type?: "heal" | "shield" | "ms" | "true" | "basic" | "basic-nocrit" | "critical" | "summoned" | "ratio" // "critical" in basicattack means confirmed critical, and that in skill means it is able to critical basic attack damage
    multiplier?: number | number[] | { nameKey: string, value: number | number[] }
}

type PropsGenerator = (props: {status: Status, skillLevels?: SkillLevels, weaponType?: WeaponTypeID, weapon?: WeaponID, gauge?: number}) => DamageTable;

export type DamageTable = {
    basicAttack: (SkillValueProps | "standard" | "disable-critical")[]
    skill: SkillValueProps[][]
}

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = context(path).default;
    return skills;
}, {}) as {[id: string]: (DamageTable | PropsGenerator)}

const weaponSkillContext = require.context("./", true, /\.\/weapon-skills\/damage-table\/.*\.ts/);
export const WeaponSkillDamageTable = weaponSkillContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const name = pathComponents[pathComponents.length - 1];
    skills[name.substring(0, name.length - 3)] = weaponSkillContext(path).default;
    return skills;
}, {}) as {[id: string]: SkillValueProps[]}