import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1090300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            1: Constants.W.multiple_hit_damage
        }
        if (showEquation) {
            return {
                ...common,
                20: Constants.W.damage.base,
                21: RatioPercent(Constants.W.damage.amp),
            }
        } else {
            return {
                ...common,
                0: Constants.W.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown }
        ]
    })
}
