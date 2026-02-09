import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1081100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.stack_base.base,
                1: RatioPercent(Constants.T.stack_base.amp),
                2: Constants.T.stack.base,
                3: RatioPercent(Constants.T.stack.amp)
            }
        } else {
            return {
                0: Constants.T.stack_base,
                1: Constants.T.stack
            }

        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.stack_base.base },
            { labelIntlID: "ToolTipType/NiahStackDamage", values: Constants.T.stack.base }
        ]
    })
}
