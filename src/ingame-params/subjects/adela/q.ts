import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1024200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.pawn_damage.base,
        2: 3,
        3: Constants.Q.queen_damage.base,
        5: Constants.Q.stun,
        6: Constants.Q.stack_reset,
        7: Constants.Q.duration,
        8: RatioPercent(Constants.Q.movement_speed),
        9: RatioPercent(Constants.Q.pawn_damage.amp),
        10: RatioPercent(Constants.Q.queen_damage.amp),
        20: Constants.Q.pawn_damage,
        21: Constants.Q.queen_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PawnDamage", values: Constants.Q.pawn_damage.base},
            {labelIntlID: "ToolTipType/QueenDamage", values: Constants.Q.queen_damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.Q.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown.constant},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
