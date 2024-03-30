import * as React from "react";
import { SubjectID } from "@app/entity/subject";
import { useLocalStorage } from "react-use";
import { WeaponID } from "@app/entity/weapon-id";
import { ArmID, ChestID, HeadID, LegID } from "@app/entity/armor-id";

export type Equipment = {
    weapon: WeaponID | null
    chest: ChestID | null
    head: HeadID | null
    arm: ArmID | null
    leg: LegID | null
}

export type SkillLevels = {
    Q: number, W: number, E: number, R: number, T: number
}

type StateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export type Response = {
    subject: StateProps<SubjectID | null>
    equipment: StateProps<Equipment>
    level: StateProps<number>
    weaponMastery: StateProps<number>
    movementMastery: StateProps<number>
    skillLevels: StateProps<SkillLevels>
}

export type SubjectConfig = {
    subject: SubjectID | null, 
    equipment: Equipment, 
    level: number, 
    weaponMastery: number, 
    movementMastery: number,
    skillLevels: SkillLevels
}

export default function(): Response {
    const [config, setConfig, removeConfig] = useLocalStorage<SubjectConfig>("main-subject-config", {
        subject: null,
        equipment: { weapon: null, chest: null, head: null, arm: null, leg: null },
        level: 1,
        weaponMastery: 1,
        movementMastery: 1,
        skillLevels: { Q: 0, W: 0, E: 0, R: 0, T: 0 }
    })
    const [subject, setSubject] = React.useState<SubjectID | null>(config?.subject || null);
    const [level, setLevel] = React.useState(config?.level || 1);
    const [weaponMastery, setWeaponMastery] = React.useState(config?.weaponMastery || 1);
    const [movementMastery, setMovementMastery] = React.useState(config?.weaponMastery || 1);
    const [equipment, setEquipment] = React.useState(config?.equipment || {
        weapon: null, chest: null, head: null, arm: null, leg: null
    } as Equipment)
    const [skillLevels, setSkillLevels] = React.useState(config?.skillLevels || { Q: 1, W: 1, E: 1, R: 1, T: 1 });

    React.useEffect(() => {
        setConfig({ subject, equipment, level, weaponMastery, movementMastery, skillLevels });
    }, [subject, level, weaponMastery, movementMastery, equipment]);
    
    return {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels]
    }
}