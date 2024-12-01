import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1051300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        2: Constants.W.shield.base,
        3: RatioPercent(Constants.W.shield.amp),
        4: Constants.W.movement_speed.duration,
        5: RatioPercent(Constants.W.movement_speed.effect),
        6: Constants.W.slow.duration,
        7: RatioPercent(Constants.W.slow.effect),
        8: Constants.W.shield_duration,
        9: Constants.W.basic_attack_flower,
        10: RatioPercent(Constants.W.damage.amp),
        11: RatioPercent(Constants.W.movement_speed.ally_effect),
        20: Constants.W.damage,
        21: Constants.W.shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.W.movement_speed.effect},
            {labelIntlID: "ToolTipType/AllyMoveSpeed", values: Constants.W.movement_speed.ally_effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
