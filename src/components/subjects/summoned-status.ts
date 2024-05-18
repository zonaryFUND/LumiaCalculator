import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status, SummonedStatus as SummonedStatusType } from "app-types/subject-dynamic/status/type";
import { SubjectID } from "app-types/subject-static";

const subjectContext = require.context("./", true, /\.\/.*\/summoned-status\.ts$/);

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatusType;

export const SummonedStatus = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    const module = subjectContext(path);
    skills[key] = {
        status: module.default,
        nameKey: module.nameKey
    }
    return skills;
}, {}) as {[id: SubjectID]: {status: SummonedStatusFunc, nameKey: string}}