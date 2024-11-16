import { Equipment, SubjectConfig } from "app-types/subject-dynamic/config";
import { OldSubjectID, SubjectCodeWithOldID } from "app-types/subject-static";
import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "react-use";

function migrateConfig(rawConfig: SubjectConfig): SubjectConfig {
    const migrateSubjectID = (id: OldSubjectID) => {
        const codeStr = Object.entries(SubjectCodeWithOldID)
            .find(([code, oldID]) => oldID == id)
            ?.[0]
        return codeStr ? +codeStr : 0
    };

    const migrateEquipment = (equipment: Equipment) => {
        if (Object.values(equipment).findIndex(e => typeof e == "string") == -1) {
            return equipment;
        }

        return {
            weapon: null,
            head: null,
            chest: null,
            arm: null,
            leg: null
        };
    }

    return {        
        ...rawConfig,
        subject: typeof rawConfig.subject == "string" ? migrateSubjectID(rawConfig.subject) : rawConfig.subject,
        equipment: migrateEquipment(rawConfig.equipment)
    }
}

export function useLocalStorageConfig(key: string): [SubjectConfig | undefined, Dispatch<SetStateAction<SubjectConfig | undefined>>] {
    const [rawConfig, save] = useLocalStorage<SubjectConfig>(key);
    return [
        rawConfig ? migrateConfig(rawConfig) : undefined,
        save
    ]
}