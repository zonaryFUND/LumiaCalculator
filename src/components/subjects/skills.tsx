import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";

const subjectContext = require.context("./", true, /\.\/.*\/skills\.tsx$/);

export type CooldownOverride = (config: SubjectConfig, status: Status) => (basic: Decimal) => Decimal;

export const SubjectSkills = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path);
    return skills;
}, {}) as any