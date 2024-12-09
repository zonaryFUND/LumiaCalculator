import * as React from "react";
import { useLocalStorageConfig } from "@app/storage/config";
import { SubjectConfig, SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { SubjectCode } from "app-types/subject-static";
import { StateWrapped } from "@app/util/state";

export type SubjectConfigProps = {
    value: SubjectConfig
    setConfig: (config: SubjectConfig) => void
} & StateWrapped<SubjectConfig>

export function useSubjectConfig(storageKey: string): SubjectConfigProps {
    const [storageConfig, saveStorageConfig] = useLocalStorageConfig(storageKey);
    const defaultConfig = storageConfig ?? SubjectConfigDefault;

    const [subject, setSubject] = React.useState<SubjectCode>(defaultConfig.subject);
    const [level, setLevel] = React.useState(defaultConfig.level);
    const [weaponMastery, setWeaponMastery] = React.useState(defaultConfig.weaponMastery);
    const [defenseMastery, setDefenseMastery] = React.useState(defaultConfig.defenseMastery);
    const [movementMastery, setMovementMastery] = React.useState(defaultConfig.weaponMastery);
    const [equipment, setEquipment] = React.useState(defaultConfig.equipment);
    const [skillLevels, setSkillLevels] = React.useState(defaultConfig.skillLevels);
    const [gauge, setGauge] = React.useState(defaultConfig.gauge);
    const [stack, setStack] = React.useState(defaultConfig.stack);

    const setConfig = React.useCallback((config: SubjectConfig) => {
        setSubject(config.subject);
        setLevel(config.level);
        setWeaponMastery(config.weaponMastery);
        setDefenseMastery(config.defenseMastery);
        setMovementMastery(config.movementMastery);
        setEquipment(config.equipment);
        setSkillLevels(config.skillLevels);
        setGauge(config.gauge);
        setStack(config.stack);
    }, []);

    const updateSubject = React.useCallback((action: React.SetStateAction<SubjectCode>) => {
        setEquipment({ Weapon: null, Chest: null, Head: null, Arm: null, Leg: null });
        setSkillLevels({Q: 0, W: 0, E: 0, R: 0, T: 0});
        setGauge(0);
        setStack(0);
        setSubject(action);
    }, []);

    React.useEffect(() => {
        saveStorageConfig({ subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack });
    }, [subject, level, weaponMastery, defenseMastery, movementMastery, equipment, skillLevels, gauge, stack]);

    const config: SubjectConfig = {
        subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack
    };

    return {
        value: { subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack },
        setConfig,
        subject: [subject, updateSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        defenseMastery: [defenseMastery, setDefenseMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels],
        gauge: [gauge, setGauge],
        stack: [stack, setStack],
    }
}
