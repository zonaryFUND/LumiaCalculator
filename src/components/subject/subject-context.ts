import { ArmID, ChestID, HeadID, LegID } from "@app/entity/armor-id";
import { SubjectID } from "@app/entity/subject";
import { WeaponID } from "@app/entity/weapon-id";
import * as React from "react";
import { Status } from "./use-status";

export type StateProps<T> = [
    T,
    React.Dispatch<React.SetStateAction<T>>
]

export const SubjectContext = React.createContext<StateProps<SubjectID | null> | undefined>(undefined);
export const LevelContext = React.createContext<StateProps<number> | undefined>(undefined);

export type Equipment = {
    weapon: WeaponID | null
    chest: ChestID | null
    head: HeadID | null
    arm: ArmID | null
    leg: LegID | null
}

export const EquipmentContext = React.createContext<StateProps<Equipment> | undefined>(undefined);
export const StatusContext = React.createContext<Status | undefined>(undefined);