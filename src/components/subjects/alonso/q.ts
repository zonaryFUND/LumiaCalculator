import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1068200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.Q.damage,
        1: RatioPercent(Constants.Q.movement_speed),
        2: RatioPercent(Constants.Q.near_movement_speed),
        3: Constants.Q.stun,
        10: Constants.Q.damage.base,
        11: RatioPercent(Constants.Q.damage.amp),
        12: showEquation ? Constants.Q.basic_attack_damage.level : Constants.Q.basic_attack_damage,
        13: RatioPercent(Constants.Q.basic_attack_damage.targetMaxHP),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/AlonsoActive1MoveSpeed", values: Constants.Q.near_movement_speed},
            {labelIntlID: "ToolTipType/AlonsoActive1TargetAttack", values: Constants.Q.basic_attack_damage.targetMaxHP},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
