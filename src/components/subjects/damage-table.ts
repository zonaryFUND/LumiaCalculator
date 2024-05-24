import { WeaponTypeID } from "app-types/equipment/weapon"
import { WeaponID } from "app-types/equipment/weapon/id"
import { SkillLevels } from "app-types/subject-dynamic/config"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio"

export type SkillDamageProps = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item"
    damage: ValueRatio
    type?: "heal" | "shield" | "ms" | "true" | "basic" | "critical" | "summoned" | "ratio" | "kenneth" // "critical" in basicattack means confirmed critical, and that in skill means it is able to critical basic attack damage
    disableCritical?: boolean
    multiplier?: number | number[]
    sidewinder?: number
}

type PropsGenerator = (props: {status: Status, skillLevels?: SkillLevels, weaponType?: WeaponTypeID, weapon?: WeaponID, gauge?: number}) => DamageTable;

export type DamageTable = {
    basicAttack: (SkillDamageProps | "standard" | "disable-critical" | "aiden" | "debimarl" | "rio")[]
    skill: SkillDamageProps[][]
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
}, {}) as {[id: string]: SkillDamageProps[]}