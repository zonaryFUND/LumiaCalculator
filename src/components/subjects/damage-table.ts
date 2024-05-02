export type SkillDamageProps = {
    label: string
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
    damage: any
    type?: "heal" | "shield" | "ms" | "true"
    multiplier?: number | number[]
}

export type DamageTable = {
    basicAttack: (SkillDamageProps | "standard" | "disable-critical")[]
    skill: SkillDamageProps[][]
}

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = context(path).default;
    return skills;
}, {}) as {[id: string]: DamageTable}