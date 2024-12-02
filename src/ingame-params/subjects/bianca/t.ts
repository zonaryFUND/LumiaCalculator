import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1042100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.slow.duration,
        1: RatioPercent(Constants.T.slow.effect),
        2: RatioPercent(Constants.T.blood_conversion.skill_damage),
        3: RatioPercent(Constants.T.blood_conversion.lost_hp),
        4: RatioPercent(Constants.T.max_blood),
        5: RatioPercent(Constants.T.blood_consumption),
        6: showEquation ? Constants.T.damage.base : Constants.T.damage,
        8: RatioPercent(Constants.T.damage.targetMaxHP),
        9: Constants.T.blood_heal_tick,
        10: RatioPercent(Constants.T.blood_heal_ratio),
        11: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.T.slow.effect},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
