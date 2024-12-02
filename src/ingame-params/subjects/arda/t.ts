import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1066100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        1: showEquation ? Constants.T.heal.base : Constants.T.heal,
        2: Constants.T.max_stack,
        3: RatioPercent(Constants.T.heal.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base},
            {labelIntlID: "ToolTipType/ArdaPassiveStack", values: Constants.T.max_stack},
        ]  
    })
}
