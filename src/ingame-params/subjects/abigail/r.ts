import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1067500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => {
        return {
            0: Constants.R.untargetable,
            1: Constants.R.slow.duration,
            2: RatioPercent(Constants.R.slow.effect),
            3: Constants.R.damage.base,
            4: `${Constants.R.damage.amp}`,
            8: Constants.R.coordinates,
            20: Constants.R.damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
