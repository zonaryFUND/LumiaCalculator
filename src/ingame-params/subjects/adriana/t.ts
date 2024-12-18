import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1017100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        8: Constants.T.duration,
        9: RatioPercent(Constants.T.defense_reduction),
        10: Constants.T.immune,
        11: Constants.T.damage,
        20: showEquation ? Constants.T.damage.base : Constants.T.damage,
        21: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdrianaBurnDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.T.defense_reduction},
        ]  
    })
}
