import { defaultSampleBuilds } from "components/modal/load-build/default-sample";
import { SubjectConfig } from "components/subject/use-subject-config";
import { useCallback } from "react";
import { useLocalStorage } from "react-use";

export const SavedBuildsKey = "saved-builds";

export type BuildWithKey = {
    name: string
    key: number
    isPreset?: boolean
    config: SubjectConfig
};

type BuildStorage = {
    builds: BuildWithKey[]
    saveNew: (name: string, config: SubjectConfig) => number
    overwrite: (key: number, config: SubjectConfig) => void
    delete: (key: number) => void
}

export function useBuildStorage(): BuildStorage {
    const [builds, saveBuilds, reset] = useLocalStorage<BuildWithKey[]>(SavedBuildsKey, []);
    const saveNew = useCallback((name: string, config: SubjectConfig) => {
        const key = Date.now();
        saveBuilds(prev => ([{name, key, config}]).concat(prev ?? []));
        return key;
    }, []);
    const overwrite = useCallback((id: number, config: SubjectConfig) => {
        saveBuilds(prev => {
            return (prev ?? []).map(build => {
                return build.key != id ? build : {
                    ...build,
                    config: config
                }
            })
        })
    }, [])
    const deleteBuild = useCallback((key: number) => {
        saveBuilds(prev => (prev ?? []).filter(b => b.key != key))
    }, [])

    return {
        builds: (builds ?? []).concat(defaultSampleBuilds),
        saveNew,
        overwrite,
        delete: deleteBuild
    }
}