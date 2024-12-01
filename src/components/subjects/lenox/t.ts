import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1020100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? RatioPercent(Constants.T.shield.maxHP) : Constants.T.shield,
        1: Constants.T.duration,
        5: Constants.T.cooldown.constant
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.fishing.common),
            1: RatioPercent(Constants.T.fishing.uncommon),
            2: RatioPercent(Constants.T.fishing.rare)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.maxHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
