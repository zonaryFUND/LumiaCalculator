import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1030100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: RatioPercent(Constants.T.heal.maxHP),
                2: Constants.T.amount,
                3: Constants.T.amount
            }
        } else {
            return {
                0: Constants.T.heal,
                2: Constants.T.amount,
                3: Constants.T.amount
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HealBurger", values: Constants.T.heal.maxHP, percent: true}
        ]  
    })
}
