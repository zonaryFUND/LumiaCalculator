import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1002100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.duration,
        1: showEquation ? Constants.T.shield.base : Constants.T.shield,
        2: showEquation ? RatioPercent(Constants.T.shield.attack) : Constants.T.cooldown_reduction,
        3: Constants.T.cooldown_reduction,
        4: RatioPercent(Constants.T.shield.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
        ]  
    })
}
