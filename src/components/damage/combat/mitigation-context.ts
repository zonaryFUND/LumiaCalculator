import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import * as React from "react";

export type Mitigation = {
    defense: {
        base: Decimal
        penetration: Decimal
        summonedPenetration?: Decimal
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

function defenseMitigationPercentage(rawDefense: Decimal, penetration: Decimal): Decimal {
    const adjustedDefense = rawDefense.sub(penetration).clamp(0, rawDefense);
    return adjustedDefense.dividedBy(adjustedDefense.add(100)).times(100);
}

export function createMitigation(status: Status, targetStatus: Status, additionalPenetrationRatio: number): Mitigation {
    const targetDefense = targetStatus.defense.calculatedValue;

    const penetration = status.armorPenetration.calculatedValue
        .add(targetDefense.percent(status.armorPenetrationRatio.calculatedValue).floor())
        .add(targetDefense.percent(additionalPenetrationRatio).floor());
    
    
    const summonedPenetration = status.summonedStatus ? status.summonedStatus.armorPenetration.add(
        targetDefense.percent(status.summonedStatus.armorPenetrationRatio).floor()
    ) : undefined;
    
    const defenseMitigation = {
        basic: defenseMitigationPercentage(targetDefense, penetration),
        summoned: summonedPenetration ? defenseMitigationPercentage(targetDefense, summonedPenetration) : undefined
    };

    const basicAttackMitigation = [{
        label: "防御熟練度によるダメージ減少",
        value: targetStatus.basicAttackReduction.calculatedValue
    }];

    const skillMitigation = [{
        label: "防御熟練度によるダメージ減少",
        value: targetStatus.skillReduction.calculatedValue
    }];

    return {
        defense: {
            base: targetDefense,
            penetration,
            summonedPenetration
        },
        defenseMitigation,
        basicAttackMitigation,
        skillMitigation
    };
}