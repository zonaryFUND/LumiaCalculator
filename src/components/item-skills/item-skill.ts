import { SubjectSkillProps } from "components/subjects/props";

export type ItemSkillProps = Partial<SubjectSkillProps> & {
    values: any
}

export type TableValues = (dictionaryValues: any) => {
    type: "basic" | "skill" | "true" | "shield" | "dot" | "true-dot" | "effect", constant: any, multiplier?: number, additionalLabel?: string
}[]

const context = require.context("./", true, /\.\/.*\/(tooltip\.tsx|table-values\.ts)$/);
export const ItemSkillDefinition = context.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const key = pathComponents[1];
    if (pathComponents[2] == "tooltip.tsx") {
        skills[key] = {
            ...(skills[key] ?? {}),
            tooltip: context(path).default
        }
    }
    if (pathComponents[2] == "table-values.ts") {
        skills[key] = {
            ...(skills[key] ?? {}),
            values: context(path).default
        }
    }
    return skills;
}, {}) as {[id: string]: {tooltip?: React.FC<ItemSkillProps>, values?: TableValues}}