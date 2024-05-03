import { WeaponTypeID } from "@app/entity/equipment"
import { Status } from "components/subject/status"
import { SkillLevels } from "components/subject/use-subject-config"
import * as React from "react"

export type SkillDamageProps = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
    damage: any
    type?: "heal" | "shield" | "ms" | "true" | "basic" | "critical" // "critical" in basicattack means confirmed critical, and that in skill means it is able to critical basic attack damage
    multiplier?: number | number[]
}

type PropsGenerator = (props: {status: Status, skillLevels?: SkillLevels, weaponType?: WeaponTypeID}) => DamageTable;

export type DamageTable = {
    basicAttack: (SkillDamageProps | "standard" | "disable-critical" | "aiden")[]
    skill: SkillDamageProps[][]
}

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = context(path).default;
    return skills;
}, {}) as {[id: string]: (DamageTable | PropsGenerator)}