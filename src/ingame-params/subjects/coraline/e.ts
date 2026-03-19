import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1087400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.E.bind,
        1: Constants.E.white_mirror_bind,
        2: Constants.E.black_mirror_bind,
        3: Constants.E.white_mirror_shield.duration,
        4: Constants.E.black_mirror_defense_reduction.duration,
        5: RatioPercent(Constants.E.black_mirror_defense_reduction.effect),
        6: Constants.E.damage,
        7: Constants.E.white_mirror_damage,
        8: Constants.E.black_mirror_damage,
        9: Constants.E.white_mirror_shield.effect,
        20: Constants.E.damage.base,
        21: RatioPercent(Constants.E.damage.amp),
        22: Constants.E.white_mirror_damage.base,
        23: RatioPercent(Constants.E.white_mirror_damage.amp),
        24: Constants.E.black_mirror_damage.base,
        25: RatioPercent(Constants.E.black_mirror_damage.amp),
        26: Constants.E.white_mirror_shield.effect.base,
        27: RatioPercent(Constants.E.white_mirror_shield.effect.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/WhiteMirror_Damage", values: Constants.E.white_mirror_damage.base},
            {labelIntlID: "ToolTipType/BlackMirror_Damage", values: Constants.E.black_mirror_damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.E.white_mirror_shield.effect.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.E.black_mirror_defense_reduction.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
