import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import * as React from "react";

export type Mitigation = {
    defense: {
        base: Decimal
        penetrated: Decimal
        summonedPenetrated?: Decimal
    }
    defenseMitigation: {
        basic: Decimal
        summoned?: Decimal
    }

    basicAttackMitigation: {
        label: string
        value: Decimal
    }[]

    skillMitigation: {
        label: string
        value: Decimal
    }[]
}

export const MitigationContext = React.createContext<Mitigation | undefined>(undefined);

export function useMitigation(): Mitigation {
    return React.useContext(MitigationContext)!
}

export function createMitigation(status: Status, targetStatus: Status): Mitigation {
    const [penetration, summonedPenetration] = {
        
    }
}