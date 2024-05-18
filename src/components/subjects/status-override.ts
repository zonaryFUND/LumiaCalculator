import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";
import { SubjectID } from "app-types/subject-static";

export type StatusOverrideFunc = (status: StatusBeforeCalculation, config: SubjectConfig) => StatusBeforeCalculation;

const subjectContext = require.context("./", true, /\.\/.*\/status-override\.ts$/);
export const SubjectStatusOverride = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path).default;
    return skills;
}, {}) as {[key: SubjectID]: StatusOverrideFunc}