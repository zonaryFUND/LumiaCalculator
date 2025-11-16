import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084310;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.DoubleBladedSwordW.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DoubleBladedSwordW.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.DoubleBladedSwordW.duration,
            1: Constants.DoubleBladedSwordW.tick
        }

        if (showEquation) {
            return {
                ...base,
                2: Constants.DoubleBladedSwordW.damage.base,
                3: RatioPercent(Constants.DoubleBladedSwordW.damage.attack)
            }
        } else {
            return {
                ...base,
                2: Constants.DoubleBladedSwordW.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DoubleBladedSwordW.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.DoubleBladedSwordW.cooldown}
        ]  
    })
}
