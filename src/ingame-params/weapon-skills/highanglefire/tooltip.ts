import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3005000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.first_damage,
        1: Constants.first_slow.duration,
        2: RatioPercent(Constants.first_slow.effect),
        3: Constants.second_blast,
        4: Constants.second_damage,
        5: Constants.second_slow.duration,
        6: RatioPercent(Constants.second_slow.effect),
        20: Constants.first_damage.base,
        21: RatioPercent(Constants.first_damage.additionalAttack),
        22: RatioPercent(Constants.first_damage.amp),
        23: Constants.second_damage.base,
        24: RatioPercent(Constants.second_damage.additionalAttack),
        25: RatioPercent(Constants.second_damage.amp),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage1", values: Constants.first_damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef1", values: Constants.first_damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/SkillAmpCoef1", values: Constants.first_damage.amp, percent: true},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio1", values: Constants.first_slow.effect, percent: true},
            {labelIntlID: "ToolTipType/Damage2", values: Constants.second_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio2", values: Constants.second_slow.effect, percent: true}
        ]  
    })
}
