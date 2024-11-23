import { Equipment, SubjectConfig, SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { OldSubjectID, OldSubjectIDs } from "./subject-id";

export type SubjectConfigV1 = Omit<SubjectConfig, "subject" | "equipment"> & {
    subject: OldSubjectID
    equipment: {
        [K in keyof Equipment as K extends string ? Lowercase<K> : never]: Equipment[K]
    }
}

export function Migrate(v1Config: SubjectConfigV1): SubjectConfig {
    const subjectIndex = OldSubjectIDs.indexOf(v1Config.subject);
    if (subjectIndex == -1) return SubjectConfigDefault;

    return {
        ...v1Config,
        subject: subjectIndex + 1,
        equipment: { Weapon: null, Head: null, Chest: null, Arm: null, Leg: null }
    }
}