import { StateWrapped } from "@app/util/state"
import { SubjectCode } from "app-types/subject-static"
import { SubjectConfig } from "./type"
import React, { useCallback } from "react"

type Response = StateWrapped<SubjectConfig> & {
    value: SubjectConfig
    setConfig: (config: SubjectConfig) => void
}

export default function(storage?: { value?: SubjectConfig | undefined, update: React.Dispatch<React.SetStateAction<SubjectConfig | undefined>> }): Response {
    const defaultConfig: SubjectConfig = storage?.value ?? {
        subject: 1,
        equipment: { weapon: null, chest: null, head: null, arm: null, leg: null },
        level: 1,
        weaponMastery: 1,
        defenseMastery: 1,
        movementMastery: 1,
        skillLevels: { Q: 0, W: 0, E: 0, R: 0, T: 0 },
        gauge: 0,
        stack: 0
    }

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
        console.log(config)
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
        setEquipment({ weapon: null, chest: null, head: null, arm: null, leg: null });
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