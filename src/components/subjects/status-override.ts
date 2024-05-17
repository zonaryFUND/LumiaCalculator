import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";

export type StatusOverrideFunc = (status: Status, config: SubjectConfig) => Status;

const subjectContext = require.context("./", true, /\.\/.*\/status-override\.ts$/);
export const SubjectStatusOverride = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path);
    return skills;
}, {}) as any