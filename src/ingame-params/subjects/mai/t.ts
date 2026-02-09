import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const common: TooltipValues = {
            2: Constants.T.level[0],
            3: Constants.T.level[1],
            4: Constants.T.level[2],
            5: Constants.T.level[3]
        }

        if (showEquation) {
            return {
                ...common,
                0: RatioPercent(Constants.T.damage.additionalMaxHP),
                1: Constants.T.damage.base
            }
        } else {
            return {
                ...common,
                0: Constants.T.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SkillAddDamageAdditionalHpRatio", values: Constants.T.damage.additionalMaxHP, percent: true }
        ]
    })
}
