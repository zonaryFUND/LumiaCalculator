import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1013300;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.defense.duration,
        1: Constants.W.defense.effect,
        3: Constants.W.heal.base,
        7: RatioPercent(Constants.W.heal.maxHP),
        20: Constants.W.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.heal.base},
            {labelIntlID: "ToolTipType/IncreaseDefence", values: Constants.W.defense.effect}
        ]  
    })
}
