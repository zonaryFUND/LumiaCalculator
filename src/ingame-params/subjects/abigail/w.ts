import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1067300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => {
        return {
            0: RatioPercent(Constants.W.additional_shield),
            1: Constants.W.shield.duration,
            2: Constants.W.damage.base,
            3: RatioPercent(Constants.W.damage.targetHP.base),
            4: RatioPercent(Constants.W.damage.targetHP.amp),
            5: Constants.W.shield.amount.base,
            6: RatioPercent(Constants.W.shield.amount.amp),
            7: RatioPercent(Constants.W.additional_shield_max),
            8: Constants.W.coordinates,
            20: Constants.W.damage,
            21: RatioPercent(Constants.W.damage.targetHP),
            22: Constants.W.shield.amount
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.amount.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
