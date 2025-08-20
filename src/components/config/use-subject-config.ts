import * as React from "react";
import { useLocalStorageConfig } from "@app/storage/config";
import { Equipment, SubjectConfig, SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { SubjectCode } from "app-types/subject-static";
import { StateWrapped } from "@app/util/state";
import { ArmArmorCodes, ChestArmorCodes, DavidChestArmorUpgradeDictionary, HeadArmorCodes, LegArmorCodes, WeaponCodes } from "app-types/equipment";

export type SubjectConfigProps = {
    value: SubjectConfig
    setConfig: (config: SubjectConfig) => void
} & StateWrapped<SubjectConfig>

export function useSubjectConfig(storageKey: string): SubjectConfigProps {
    const [storageConfig, saveStorageConfig] = useLocalStorageConfig(storageKey);
    const defaultConfig: SubjectConfig = (() => {
        if (storageConfig) {
            const equipment = storageConfig.equipment;
            const allWeaponCodes = Object.values(WeaponCodes).flat();
            const Chest = equipment.Chest && ChestArmorCodes.includes(equipment.Chest) ? equipment.Chest : null;
            const sanitizedEquipment: Equipment = {
                Weapon: equipment.Weapon && allWeaponCodes.includes(equipment.Weapon) ? equipment.Weapon : null,
                Head: equipment.Head && HeadArmorCodes.includes(equipment.Head) ? equipment.Head : null,
                Chest,
                isChestDavid: equipment.isChestDavid && Chest != null && DavidChestArmorUpgradeDictionary[Chest] != undefined,
                Arm: equipment.Arm && ArmArmorCodes.includes(equipment.Arm) ? equipment.Arm : null,
                Leg: equipment.Leg && LegArmorCodes.includes(equipment.Leg) ? equipment.Leg : null
            };
            return {...storageConfig, equipment: sanitizedEquipment};
        } else {
            return SubjectConfigDefault;
        }
    })();

    const [subject, setSubject] = React.useState<SubjectCode>(defaultConfig.subject);
    const [level, setLevel] = React.useState(defaultConfig.level);
    const [weaponMastery, setWeaponMastery] = React.useState(defaultConfig.weaponMastery);
    const [defenseMastery, setDefenseMastery] = React.useState(defaultConfig.defenseMastery);
    const [movementMastery, setMovementMastery] = React.useState(defaultConfig.weaponMastery);
    const [equipment, setEquipment] = React.useState(defaultConfig.equipment);
    const [skillLevels, setSkillLevels] = React.useState(defaultConfig.skillLevels);
    const [gauge, setGauge] = React.useState(defaultConfig.gauge);
    const [stack, setStack] = React.useState(defaultConfig.stack);
    const [perpetualOuterBuffs, setPerpetualOuterBuffs] = React.useState(defaultConfig.perpetualOuterBuffs);

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
        saveStorageConfig({ subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack, perpetualOuterBuffs });
    }, [subject, level, weaponMastery, defenseMastery, movementMastery, equipment, skillLevels, gauge, stack]);

    const config: SubjectConfig = {
        subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack, perpetualOuterBuffs
    };

    return {
        value: { subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack, perpetualOuterBuffs },
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
        perpetualOuterBuffs: [perpetualOuterBuffs, setPerpetualOuterBuffs]
    }
}
