import * as React from "react";

type DamageExpression = "damage" | "hp-ratio";
export const DamageExpressionContext = React.createContext<DamageExpression>("damage");

export function useDamageExpression(): DamageExpression {
    return React.useContext(DamageExpressionContext);
}