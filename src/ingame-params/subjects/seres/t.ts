import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1091100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        1: Constants.T.max_stack,
        2: Constants.T.damage.base,
        3: RatioPercent(Constants.T.damage.targetMaxHP)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            { labelIntlID: "ToolTipType/TargetMaxHpCoef", values: Constants.T.damage.targetMaxHP, percent: true }
        ]
    })
}
