import { StateWrapped } from "@app/util/state"
import { SubjectCode } from "app-types/subject-static"
import { SubjectConfig, SubjectConfigDefault } from "./type"
import React, { useCallback } from "react"

type Response = StateWrapped<SubjectConfig> & {
    value: SubjectConfig
    setConfig: (config: SubjectConfig) => void
}

export default function(storage?: { value?: SubjectConfig | undefined, update: (config: SubjectConfig) => void }): Response {
    const defaultConfig: SubjectConfig = storage?.value ?? SubjectConfigDefault

    const [subject, setSubject] = React.useState<SubjectCode>(defaultConfig.subject);
    const [level, setLevel] = React.useState(defaultConfig.level);
    const [weaponMastery, setWeaponMastery] = React.useState(defaultConfig.weaponMastery);
    const [defenseMastery, setDefenseMastery] = React.useState(defaultConfig.defenseMastery);
    const [movementMastery, setMovementMastery] = React.useState(defaultConfig.weaponMastery);
    const [equipment, setEquipment] = React.useState(defaultConfig.equipment);
    const [skillLevels, setSkillLevels] = React.useState(defaultConfig.skillLevels);
    const [gauge, setGauge] = React.useState(defaultConfig.gauge);
    const [stack, setStack] = React.useState(defaultConfig.stack);

    const setConfig = useCallback((config: SubjectConfig) => {
        setSubject(config.subject);
        setLevel(config.level);
        setWeaponMastery(config.weaponMastery);
        setDefenseMastery(config.defenseMastery);
        setMovementMastery(config.movementMastery);
        setEquipment(config.equipment);
        setSkillLevels(config.skillLevels);
        setGauge(config.gauge);
        setStack(config.stack);
    }, [])

    const updateSubject = React.useCallback((action: React.SetStateAction<SubjectCode>) => {
        setEquipment({ Weapon: null, Chest: null, Head: null, Arm: null, Leg: null });
        setSkillLevels({Q: 0, W: 0, E: 0, R: 0, T: 0});
        setGauge(0);
        setStack(0);
        setSubject(action);
    }, [])

    React.useEffect(() => {
        storage?.update({ subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack });
    }, [subject, level, weaponMastery, defenseMastery, movementMastery, equipment, skillLevels, gauge, stack]);
    
    return {
        value: { subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack },
        subject: [subject, updateSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        defenseMastery: [defenseMastery, setDefenseMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels],
        gauge: [gauge, setGauge],
        stack: [stack, setStack],
        setConfig
    }
}