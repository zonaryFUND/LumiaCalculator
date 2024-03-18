import { SubjectID } from "@app/entity/subject";
import { WeaponID } from "@app/entity/weapon-id";
import * as React from "react";

type StateProps<T> = {
    value: T
    setValue: (value: T) => void
}

export const SubjectContext = React.createContext<StateProps<SubjectID> | undefined>(undefined);
export const LevelContext = React.createContext<StateProps<number> | undefined>(undefined);

type Equipment = {
    weapon: WeaponID | null
}

export const EquipmentContext = React.createContext<StateProps<Equipment> | undefined>(undefined);