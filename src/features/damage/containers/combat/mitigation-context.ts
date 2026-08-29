import { Mitigation } from "core/damage-table/mitigation";
import * as React from "react";

export const MitigationContext = React.createContext<Mitigation | undefined>(undefined);

export function useMitigation(): Mitigation {
    return React.useContext(MitigationContext)!
}
