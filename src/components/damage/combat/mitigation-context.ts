import { SubjectConfig } from "app-types/subject-dynamic/config";
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
        labelIntlID: string
        mitigationType: "ratio" | "constant"
        value: Decimal
    }[]

    skillMitigation: {
        labelIntlID: string
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

export function createMitigation(status: Status, targetStatus: Status): Mitigation {
    const targetDefense = targetStatus.defense.calculatedValue;

    const penetration = status.armorPenetration.calculatedValue
        .add(targetDefense.percent(status.armorPenetrationRatio.calculatedValue).floor())
    
    const summonedPenetration = status.summoned ? status.summoned[0].status.armorPenetration.add(
        targetDefense.percent(status.summoned[0].status.armorPenetrationRatio).floor()
    ) : undefined;
    
    const defenseMitigation = {
        basic: defenseMitigationPercentage(targetDefense, penetration),
        summoned: summonedPenetration ? defenseMitigationPercentage(targetDefense, summonedPenetration) : undefined
    };

    const basicAttackMitigation = [
        {
            labelIntlID: "app.mitigation.defense-mastery",
            mitigationType: "ratio",
            value: targetStatus.basicAttackReduction.calculatedValue
        },
        targetStatus.basicAttackReductionConstant.overrideAdditional ?
        {
            labelIntlID: targetStatus.basicAttackReductionConstant.overrideAdditional.nameKey,
            mitigationType: "constant",
            value: targetStatus.basicAttackReductionConstant.calculatedValue
        } : undefined
    ].filter((e): e is {
        labelIntlID: string
        mitigationType: "ratio" | "constant"
        value: Decimal
    } => e != undefined);

    const skillMitigation = [{
        labelIntlID: "app.mitigation.defense-mastery",
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