export type DamageTable = {
    basicAttack: ({
        label: string
        damage: any
    } | "standard")[]
    skill: {
        label: string
        skill: "Q" | "W" | "E" | "R" | "T" | "D"
        damage: any
        type?: "heal"
        multiplier?: number | number[]
    }[][]
}

const context = require.context("./", true, /\.\/.*\/damage-table\.ts$/);
export const SubjectDamageTable = context.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = context(path).default;
    return skills;
}, {}) as {[id: string]: DamageTable}