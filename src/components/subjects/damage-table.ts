export type DamageTable = {
    basicAttack: ({
        label: string
        damage: any
    } | "standard" | "disable-critical")[]
    skill: {
        label: string
        skill: "Q" | "W" | "E" | "R" | "T" | "D"
        damage: any
        type?: "heal" | "shield" | "ms" | "true"
        multiplier?: number | number[]
    }[][]
}

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = context(path).default;
    return skills;
}, {}) as {[id: string]: DamageTable}