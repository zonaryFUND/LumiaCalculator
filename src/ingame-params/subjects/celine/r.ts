import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1043500;

const maxCooldownIncrease = Constants.R.cooldown_increase * Constants.R.max_level;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        2: Constants.R.damage.base,
        6: Constants.R.slow.duration,
        7: RatioPercent(Constants.R.slow.effect),
        8: RatioPercent(Constants.R.damage.amp),
        9: Constants.R.cooldown_increase,
        10: maxCooldownIncrease,
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
