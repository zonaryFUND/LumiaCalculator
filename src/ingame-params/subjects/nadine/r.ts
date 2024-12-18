import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1006500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.count,
            3: RatioPercent(Constants.R.movement_speed),
            5: RatioPercent(Constants.R.attack_speed),
            9: Constants.R.extend
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.R.damage.base,
                4: RatioPercent(Constants.R.damage.additionalAttack),
                6: RatioPercent(Constants.R.damage.amp),
                7: Constants.R.duration,
            }
        } else {
            return {
                ...base,
                7: Constants.R.damage,
                8: Constants.R.duration,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
