import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1087200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.Q.damage,
        1: RatioPercent(Constants.Q.white_mirror_damage.targetHP),
        2: RatioPercent(Constants.Q.black_mirror_damage.targetLostHP),
        3: Constants.Q.white_mirror_damage,
        4: Constants.Q.black_mirror_damage,
        5: Constants.Q.white_mirror_slow.duration,
        6: RatioPercent(Constants.Q.white_mirror_slow.effect),
        7: Constants.Q.black_mirror_slow.duration,
        8: RatioPercent(Constants.Q.black_mirror_slow.effect),
        20: Constants.Q.damage.base,
        21: RatioPercent(Constants.Q.damage.amp),
        22: Constants.Q.white_mirror_damage.base,
        23: RatioPercent(Constants.Q.white_mirror_damage.amp),
        24: Constants.Q.black_mirror_damage.base,
        25: RatioPercent(Constants.Q.black_mirror_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/WhiteMirror_Damage", values: Constants.Q.white_mirror_damage.base},
            {labelIntlID: "ToolTipType/BlackMirror_Damage", values: Constants.Q.black_mirror_damage.base},
            {labelIntlID: "ToolTipType/PresentHpDamageRatio", values: Constants.Q.white_mirror_damage.targetHP, percent: true},
            {labelIntlID: "ToolTipType/LostHpDamageRatio", values: Constants.Q.black_mirror_damage.targetLostHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
