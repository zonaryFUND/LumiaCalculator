import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1067100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => {
        return {
            0: Constants.T.cooldown_reduction,
            1: Constants.T.damage.base,
            2: RatioPercent(Constants.T.damage.amp),
            3: Constants.T.defense_reduction.duration,
            4: Constants.T.defense_reduction.effect,
            20: Constants.T.damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefense", values: Constants.T.defense_reduction.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
