import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1002200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? RatioPercent(Constants.Q.second_damage.attack) : Constants.Q.second_damage,
        1: showEquation ? Constants.Q.second_damage.base : Constants.Q.first_damage,
        2: showEquation ? RatioPercent(Constants.Q.second_damage.amp) : Constants.Q.attack_speed.duration,
        3: showEquation ? RatioPercent(Constants.Q.first_damage.attack) : RatioPercent(Constants.Q.attack_speed.effect),
        4: Constants.Q.attack_speed.duration,
        5: RatioPercent(Constants.Q.attack_speed.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.Q.attack_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
        ]  
    })
}
