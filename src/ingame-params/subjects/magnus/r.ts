import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1004500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.duration,
            3: Constants.R.max_speed,
            21: RatioPercent(Constants.R.damage.targetHP)
        };

        if (showEquation) {
            return {
                ...base,
                1: Constants.R.damage.base,
                2: RatioPercent(Constants.R.damage.additionalAttack),
                4: RatioPercent(Constants.R.damage.amp),
                5: Constants.R.stack_gain
            }
        } else {
            return {
                ...base,
                1: Constants.R.stack_gain,
                20: Constants.R.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/StackAcquisition", values: Constants.R.stack_gain},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
