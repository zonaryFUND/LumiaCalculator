import { WeaponTypeID } from "@app/entity/equipment"
import { WeaponID } from "@app/entity/weapon-id"
import { Status } from "components/subject/status"
import { SkillLevels } from "components/subject/use-subject-config"

export type SkillDamageProps = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
    damage: any
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