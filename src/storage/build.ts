import { SubjectConfig } from "components/subject/use-subject-config";
import { useCallback } from "react";
import { useLatest, useLocalStorage } from "react-use";

export const SimpleCurrentConfigKey = "simple/current-build";
export const SimpleCurrentSelectedKey = "simple/current-selected";
export const SavedBuildsKey = "saved-builds";

export type BuildWithKey = [string, number, SubjectConfig];

type BuildStorage = {
    builds: BuildWithKey[]
    saveNew: (name: string, config: SubjectConfig) => void
}

export function useBuildStorage(): BuildStorage {
    const [builds, saveBuilds] = useLocalStorage<BuildWithKey[]>(SavedBuildsKey, []);
    const saveNew = useCallback((name: string, config: SubjectConfig) => {
        saveBuilds(prev => prev?.concat([name, Date.now(), config]));
    }, []);

    return {
        builds: builds ?? [],
        saveNew
    }
}