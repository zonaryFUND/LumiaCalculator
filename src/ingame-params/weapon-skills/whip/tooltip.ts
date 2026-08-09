import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3004000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.first_damage.base,
        1: RatioPercent(Constants.first_damage.additionalAttack),
        2: RatioPercent(Constants.first_damage.amp),
        3: Constants.slow.duration,
        4: RatioPercent(Constants.slow.effect),
        5: Constants.second_damage.base,
        6: RatioPercent(Constants.second_damage.additionalAttack),
        7: RatioPercent(Constants.second_damage.amp),
        20: Constants.first_damage,
        21: RatioPercent(Constants.first_damage.targetHP),
        22: Constants.second_damage,
        23: RatioPercent(Constants.second_damage.targetLostHP),
        24: Constants.reuse
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage1", values: Constants.first_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/Damage2", values: Constants.second_damage.base}
        ]  
    })
}
