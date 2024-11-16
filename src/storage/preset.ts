import { SubjectConfig } from "app-types/subject-dynamic/config";
import { defaultSampleBuilds } from "components/modal/load-build/default-sample";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";

export const SavedPresetsKey = "saved-builds";

export type PresetWithKey = {
    name: string
    key: number
    isPremadeSample?: boolean
    config: SubjectConfig
};

type BuildStorage = {
    presets: PresetWithKey[]
    saveNew: (name: string, config: SubjectConfig) => number
    overwrite: (key: number, config: SubjectConfig) => void
    delete: (key: number) => void
}

export function usePresetStorage(): BuildStorage {
    const [presets, savePresets, reset] = useLocalStorage<PresetWithKey[]>(SavedPresetsKey, []);

    const saveNew = useCallback((name: string, config: SubjectConfig) => {
        const key = Date.now();
        savePresets(prev => ([{name, key, config}]).concat(prev ?? []));
        return key;
    }, []);
    const overwrite = useCallback((id: number, config: SubjectConfig) => {
        savePresets(prev => {
            return (prev ?? []).map(build => {
                return build.key != id ? build : {
                    ...build,
                    config: config
                }
            })
        })
    }, [])
    const deletePreset = useCallback((key: number) => {
        savePresets(prev => (prev ?? []).filter(b => b.key != key))
    }, [])

    return {
        presets: (presets ?? []).concat(defaultSampleBuilds),
        saveNew,
        overwrite,
        delete: deletePreset
    }
}