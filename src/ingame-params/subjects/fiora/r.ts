import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1003500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        1: Constants.R.damage.base,
        9: Constants.R.slow.duration,
        10: RatioPercent(Constants.R.slow.effect),
        12: RatioPercent(Constants.R.damage.amp),
        13: Constants.R.damage,
        14: Constants.R.finish_damage,
        15: Constants.R.stun,
        16: Constants.R.finish_damage.base,
        17: RatioPercent(Constants.R.finish_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FioraActive4FirstSecondDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/FioraActive4ThirdDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
