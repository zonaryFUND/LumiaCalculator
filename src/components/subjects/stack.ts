import { SubjectID } from "app-types/subject-static";

const subjectModules = import.meta.glob<{MaxStack: number, StackName: number}>("./**/stack.ts", {eager: true});

export const SubjectStackInfo = Object.entries(subjectModules).reduce((skills, [key, m]) => {
    const subject = key.substring(2, key.lastIndexOf("/"));
    return {
        ...skills,
        [subject]: {
            max: m.MaxStack,
            nameKey: m.StackName
        }
    }
}, {}) as {
    [id: SubjectID]: {
        max: number, nameKey: string
    }
}