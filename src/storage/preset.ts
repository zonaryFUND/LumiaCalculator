import { Equipment, SubjectConfig, SubjectConfigDefault } from "core/subject-dynamic/config";
import { DefaultSamplePresets } from "@app/features/subject-config/components/load-build-modal-default-sample";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";
import { PresetWithKeyV1 } from "./migration-v1/preset";
import { Migrate } from "./migration-v1/config";

export const SavedPresetsKey = "saved-builds";

export type PresetWithKey = {
    version: "v2",
    name: string
    key: number
    isPremadeSample?: boolean
    config: SubjectConfig
}

type BuildStorage = {
    presets: PresetWithKey[]
    saveNew: (name: string, config: SubjectConfig) => number
    overwrite: (key: number, config: SubjectConfig) => void
    delete: (key: number) => void
}

export function usePresetStorage(): BuildStorage {
    const [presets, savePresets, reset] = useLocalStorage<(PresetWithKey | PresetWithKeyV1)[]>(SavedPresetsKey, []);
    const versionFixedPresets: PresetWithKey[] | undefined = useMemo(() => {
        return presets?.map(preset => {
            if (preset.version == undefined) {
                return {
                    ...preset,
                    version: "v2",
                    config: Migrate(preset.config)
                }
            } else {
                // 保存済みデータに存在しないフィールドはSubjectConfigDefault側の値で補う
                // （v2形式でも、フィールド追加より前に保存されたプリセットには存在しない場合がある）
                return {
                    ...preset,
                    config: { ...SubjectConfigDefault, ...preset.config }
                };
            }
        })
    }, [presets]);

    const saveNew = useCallback((name: string, config: SubjectConfig) => {
        const key = Date.now();
        savePresets(prev => [
            {version: "v2", name, key, config},
            ...(prev ?? [])
        ]);
        return key;
    }, []);
    const overwrite = useCallback((id: number, config: SubjectConfig) => {
        savePresets(prev => {
            return (prev ?? []).map(build => {
                return build.key != id ? build : {
                    ...build,
                    version: "v2",
                    config
                }
            })
        })
    }, [])
    const deletePreset = useCallback((key: number) => {
        savePresets(prev => (prev ?? []).filter(b => b.key != key))
    }, [])

    return {
        presets: (versionFixedPresets ?? []).concat(DefaultSamplePresets),
        saveNew,
        overwrite,
        delete: deletePreset
    }
}