import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1063500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.LyAnhR.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.LyAnhQ.damage.base,
                1: RatioPercent(Constants.LyAnhQ.damage.attack),
                2: Constants.GhostQ.damage.base,
                3: RatioPercent(Constants.GhostQ.damage.attack),
                4: RatioPercent(Constants.LyAnhR.attack_damage.attack),
                5: RatioPercent(Constants.LyAnhR.attack_speed.base),
                6: RatioPercent(Constants.LyAnhR.attack_speed.attack),
                7: Constants.LyAnhR.fear_range,
                10: Constants.LyAnhR.hp_on_death,
                11: Constants.LyAnhR.fear,
                12: Constants.LyAnhR.fear_count
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.LyAnhR.damage,
                1: Constants.LyAnhR.maxhp,
                2: RatioPercent(Constants.LyAnhR.movement_speed),
                3: Constants.LyAnhR.attack_damage,
                4: RatioPercent(Constants.LyAnhR.attack_speed),
                5: Constants.LyAnhR.fear_count,
                6: Constants.LyAnhR.fear_range,
                7: Constants.LyAnhR.thrash_decline,
                8: Constants.LyAnhR.range,
                9: Constants.LyAnhR.hp_on_death,
                10: Constants.LyAnhR.fear
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.LyAnhR.fear_immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhR.damage.base},
            {labelIntlID: "ToolTipType/MaxHpUp", values: Constants.LyAnhR.maxhp},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.LyAnhR.attack_speed.base, percent: true},
            {labelIntlID: "ToolTipType/FearTime", values: Constants.LyAnhR.fear},
            {labelIntlID: "ToolTipType/LyanhPossession_Active4_RemainHP", values: Constants.LyAnhR.hp_on_death},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.LyAnhR.cooldown}
        ]  
    })
}
