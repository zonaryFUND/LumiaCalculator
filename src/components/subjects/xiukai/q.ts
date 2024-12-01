import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1013200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "hp",
        value: Constants.Q.hp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        3: RatioPercent(Constants.Q.slow),
        4: RatioPercent(Constants.Q.damage.amp),
        5: RatioPercent(Constants.Q.damage.maxHP),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.hp_cost},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow, percent: true}
        ]  
    })
}
