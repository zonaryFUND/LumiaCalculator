import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";

export const code = 3006000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }) => ({
        0: Constants.duration,
        1: Constants.damage.base,
        2: RatioPercent(Constants.slow.effect),
        3: RatioPercent(Constants.multiple_reduction),
        4: Constants.slow.duration,
        5: RatioPercent(Constants.damage.additionalAttack),
        6: RatioPercent(Constants.damage.amp),
        20: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.slow.effect, percent: true}
        ]  
    })
}
