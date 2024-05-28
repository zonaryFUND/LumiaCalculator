import { SubjectID } from "app-types/subject-static";

const subjectContext = require.context("./", true, /\.\/.*\/stack\.ts$/);

export const SubjectStackInfo = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    const module = subjectContext(path);
    skills[key] = {
        max: module.MaxStack,
        nameKey: module.StackName
    }
    return skills;
}, {}) as {[id: SubjectID]: {max: number, nameKey: string}}