import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1037300;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: Constants.W.slow.duration,
        2: Constants.W.blast_duration,
        3: Constants.W.damage.base,
        4: RatioPercent(Constants.W.damage.attack),
        7: RatioPercent(Constants.W.stored_damage),
        8: Constants.W.vision_decrease,
        12: RatioPercent(Constants.W.slow.effect),
        20: Constants.W.damage
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Accumulation", values: Constants.W.stored_damage, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base}
        ]  
    })
}
