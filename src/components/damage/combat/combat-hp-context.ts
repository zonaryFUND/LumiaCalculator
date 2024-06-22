import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    hp: number
    targetHP: number
    targetMaxHP: Decimal
}

export const CombatHPContext = React.createContext<Props | undefined>(undefined);

export function useCombatHPContext(): Props { 
    return React.useContext(CombatHPContext)!;
}