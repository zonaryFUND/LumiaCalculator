import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";
import { OldSubjectID } from "app-types/subject-static";

export type StatusOverrideFunc = (status: StatusBeforeCalculation, config: SubjectConfig) => StatusBeforeCalculation;

const subjectModules = import.meta.glob("./**/status-override.ts", {eager: true});
export const SubjectStatusOverride = Object.entries(subjectModules).reduce((skills: any, [path, m]) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    return {
        ...skills,
        [key]: m
    }
}, {}) as {[key: OldSubjectID]: StatusOverrideFunc}