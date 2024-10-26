import { PresetWithKey, usePresetStorage } from "@app/storage/preset";
import { CombatCurrentLeftConfigKey, CombatCurrentLeftSelectedKey, CombatCurrentRightConfigKey, CombatCurrentRightSelectedKey } from "@app/storage/combat";
import { useSelectedPresetKey } from "@app/storage/use-selected-preset-key";
import { StateProps } from "@app/util/state";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import useSubjectConfig from "app-types/subject-dynamic/config/use-subject-config";
import { Status } from "app-types/subject-dynamic/status/type";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import { ConfigModifierProps } from "components/config/config";
import * as React from "react";
import { useLocalStorage } from "react-use";

type Response = {
    config: SubjectConfig
    setConfig: (config: SubjectConfig) => void
    status: Status
    modifier: ConfigModifierProps
    hp: StateProps<number>

    currentPreset: PresetWithKey | undefined
    onLoadPreset: (preset: PresetWithKey) => void
    onSavePreset: (name: string) => void
    onOverwriteCurrentPreset: () => void
    onDeleteCurrentPreset: () => void
}

export default function useCombatConfig(target: "left" | "right"): Response {
    const [
        storageConfig, 
        saveStorageConfig
    ] = useLocalStorage<SubjectConfig>(target == "left" ? CombatCurrentLeftConfigKey : CombatCurrentRightConfigKey);
    const config = useSubjectConfig({value: storageConfig, update: saveStorageConfig});
    const status = useStatus(config.value);

    const storage = usePresetStorage();
    const { currentPresetKey, setCurrentPresetKey } = useSelectedPresetKey(
        target == "left" ? CombatCurrentLeftSelectedKey : CombatCurrentRightSelectedKey
    );
    const currentPreset = React.useMemo(() => {
        return storage.presets.find(b => b.key == currentPresetKey);
    }, [storage.presets.length, currentPresetKey]);

    const onLoadPreset = React.useCallback((presetWithKey: PresetWithKey) => {
        config.setConfig(presetWithKey.config);
        setCurrentPresetKey(presetWithKey.key);
    }, []);

    const onSavePreset = React.useCallback((name: string) => {
        const key = storage.saveNew(name, config.value);
        setCurrentPresetKey(key);
    }, [config.value])

    const onOverwriteCurrentPreset = React.useCallback(() => {
        storage.overwrite(currentPresetKey!, config.value)
    }, [currentPresetKey, config.value]);
    
    const hp = React.useState(0);

    return {
        config: config.value,
        setConfig: config.setConfig,
        status,
        modifier: config,
        hp,

        currentPreset,
        onLoadPreset,
        onSavePreset,
        onOverwriteCurrentPreset,
        onDeleteCurrentPreset: () => setCurrentPresetKey(undefined)
    }
}