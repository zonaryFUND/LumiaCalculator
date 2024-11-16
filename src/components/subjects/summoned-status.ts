import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status, SummonedStatus as SummonedStatusType } from "app-types/subject-dynamic/status/type";
import { OldSubjectID } from "app-types/subject-static";

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatusType;
const subjectModules = import.meta.glob<{default: SummonedStatusFunc, nameKey: string}>("./**/summoned-status.ts", {eager: true});

export const SummonedStatus = Object.entries(subjectModules).reduce((skills, [key, m]) => {
    const subject = key.substring(2, key.lastIndexOf("/"));
    return {
        ...skills,
        [subject]: {
            status: m.default,
            nameKey: m.nameKey
        }
    }
}, {}) as {[id: OldSubjectID]: {status: SummonedStatusFunc, nameKey: string}}