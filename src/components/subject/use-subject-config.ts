import * as React from "react";
import { SubjectID } from "@app/entity/subject";
import { Equipment, StateProps } from "./subject-context";
import { useLocalStorage } from "react-use";

export type Response = {
    subject: StateProps<SubjectID | null>
    equipment: StateProps<Equipment>
    level: StateProps<number>
    weaponMastery: StateProps<number>
    movementMastery: StateProps<number>
}

export type SubjectConfig = {
    subject: SubjectID | null, 
    equipment: Equipment, 
    level: number, 
    weaponMastery: number, 
    movementMastery: number
}

export default function(): Response {
    const [config, setConfig] = useLocalStorage<SubjectConfig>("main-subject-config", {
        subject: null,
        equipment: { weapon: null, chest: null, head: null, arm: null, leg: null },
        level: 1,
        weaponMastery: 1,
        movementMastery: 1
    })

    const [subject, setSubject] = React.useState<SubjectID | null>(config?.subject || null);
    const [level, setLevel] = React.useState(config?.level || 1);
    const [weaponMastery, setWeaponMastery] = React.useState(config?.weaponMastery || 1);
    const [movementMastery, setMovementMastery] = React.useState(config?.weaponMastery || 1);
    const [equipment, setEquipment] = React.useState(config?.equipment || {
        weapon: null, chest: null, head: null, arm: null, leg: null
    } as Equipment)

    React.useEffect(() => {
        setConfig({ subject, equipment, level, weaponMastery, movementMastery });
    }, [subject, level, weaponMastery, movementMastery, equipment]);

    return {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        movementMastery: [movementMastery, setMovementMastery]
    }
}