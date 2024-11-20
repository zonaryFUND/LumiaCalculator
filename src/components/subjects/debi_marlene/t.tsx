import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1065100;

const aaRatio = {
    attack: Constants.T.basic_attack_damage,
    basicAttackAmp: 100
}

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, status }) => ({
        1: Constants.T.debi_defense[skillLevel],
        2: showEquation ? Constants.T.marlene_range : Constants.T.max_stack,
        3: showEquation ? `${aaRatio.attack}%` : Constants.T.damage,
        4: showEquation ? Constants.T.max_stack : Constants.T.movement_speed.duration,
        5: showEquation ? Constants.T.damage.base[skillLevel] : aaRatio,
        6: showEquation ? `${Constants.T.damage.additionalAttack}%` : `${Constants.T.movement_speed.effect[skillLevel]}%`,
        7: Constants.T.max_ms_stack,
        8: showEquation ? `${status.criticalChance.calculatedValue.percent(Constants.T.damage.criticalChance).toString()}%` : Constants.T.e_cooldown_reduction,
        9: showEquation ? `${Constants.T.damage.criticalChance}%` : Constants.T.color_change_e_cdr,
        10: Constants.T.movement_speed.duration,
        11: showEquation ? `${Constants.T.movement_speed.effect[skillLevel]}%` : Constants.T.debi_defense[skillLevel],
        12: showEquation ? Constants.T.max_ms_stack : Constants.T.marlene_range,
        13: Constants.T.e_cooldown_reduction,
        14: Constants.T.color_change_e_cdr
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.T.damage.criticalChance}%`,
            1: "1%",
            2: `${Constants.T.critical_damage_to_chance}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/IncreaseDefence", values: Constants.T.debi_defense},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
