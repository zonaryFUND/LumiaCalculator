import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1056500;

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.R.damage.base,
                2: RatioPercent(Constants.R.damage.amp),
                3: Constants.R.shield.base,
                4: RatioPercent(Constants.R.shield.amp),
                5: Constants.R.cooldown_reduction,
                6: RatioPercent(Constants.R.attack_speed),
                7: Constants.R.shield_duration
            }
        } else {
            return {
                0: Constants.R.shield,
                1: Constants.R.cooldown_reduction,
                2: Constants.R.attack_speed,
                3: Constants.R.damage,
                4: Constants.R.shield_duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.R.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base}
        ]  
    })
}
