import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1059500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const stack = Constants.R.additionalDamage.stack;
        const min = {
            base: Constants.R.additionalDamage.stack,
            attack: Constants.R.additionalDamage.attack,
        };
        const max = {
            base: Constants.R.additionalDamage.stack.map(v => v * 2),
            attack: Constants.R.additionalDamage.attack
        };
        const base = {
            0: Constants.E.time_bound
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base,
                1: RatioPercent(Constants.R.damage.attack),
                3: RatioPercent(stack),
                4: RatioPercent(Constants.R.additionalDamage.attack),
                5: RatioPercent(Constants.R.slow)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.damage,
                1: RatioPercent(min),
                2: RatioPercent(Constants.R.slow),
                3: RatioPercent(max)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/DamageTargetLossHpCoefByLevel", values: Constants.R.additionalDamage.stack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
