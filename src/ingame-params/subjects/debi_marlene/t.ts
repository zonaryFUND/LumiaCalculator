import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { CriticalMultipier, RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1065100;

const aaRatio = {
    attack: Constants.T.basic_attack_damage,
    basicAttackAmp: 100
}

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        1: Constants.T.debi_defense,
        2: showEquation ? Constants.T.marlene_range : Constants.T.max_stack,
        3: showEquation ? RatioPercent(aaRatio.attack) : Constants.T.damage,
        4: showEquation ? Constants.T.max_stack : Constants.T.movement_speed.duration,
        5: showEquation ? Constants.T.damage.base : aaRatio,
        6: showEquation ? RatioPercent(Constants.T.damage.additionalAttack) : RatioPercent(Constants.T.movement_speed.effect),
        7: Constants.T.max_ms_stack,
        8: showEquation ? CriticalMultipier(Constants.T.damage.criticalChance) : Constants.T.e_cooldown_reduction,
        9: showEquation ? RatioPercent(Constants.T.damage.criticalChance) : Constants.T.color_change_e_cdr,
        10: Constants.T.movement_speed.duration,
        11: showEquation ? RatioPercent(Constants.T.movement_speed.effect) : Constants.T.debi_defense,
        12: showEquation ? Constants.T.max_ms_stack : Constants.T.marlene_range,
        13: Constants.T.e_cooldown_reduction,
        14: Constants.T.color_change_e_cdr
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.damage.criticalChance),
            1: "1%",
            2: RatioPercent(Constants.T.critical_damage_to_chance)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/IncreaseDefence", values: Constants.T.debi_defense},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
