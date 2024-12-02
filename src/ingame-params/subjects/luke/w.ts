import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.attack),
                3: Constants.W.duration,
                4: Constants.W.basic_attack_damage.base,
                5: RatioPercent(Constants.W.basic_attack_damage.attack),
                7: Constants.W.attack_speed.duration,
                8: RatioPercent(Constants.W.attack_speed.one_stack),
                9: Constants.W.attack_speed.max_stack,
                10: RatioPercent(Constants.W.heal),
                11: RatioPercent(Constants.W.max_heal)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.duration,
                2: Constants.W.basic_attack_damage,
                3: Constants.W.attack_speed.duration,
                4: RatioPercent(Constants.W.attack_speed.one_stack),
                5: Constants.W.attack_speed.max_stack,
                6: RatioPercent(Constants.W.heal),
                7: RatioPercent(Constants.W.max_heal)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AddSkillDamage", values: Constants.W.basic_attack_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
