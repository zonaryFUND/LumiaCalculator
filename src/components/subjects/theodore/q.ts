import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1062200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: RatioPercent(Constants.Q.movement_speed_penalty),
            2: Constants.Q.heal_duration
        }
        if (showEquation) {
            return {
                ...base,
                7: Constants.Q.damage.base,
                9: RatioPercent(Constants.Q.damage.amp),
                10: Constants.Q.heal.base,
                12: RatioPercent(Constants.Q.heal.amp),
                13: Constants.Q.screen_damage.base,
                15: RatioPercent(Constants.Q.screen_damage.amp),
                16: Constants.Q.screen_heal.base,
                18: RatioPercent(Constants.Q.screen_heal.amp)
            }
        } else {   
            return {
                ...base,
                1: Constants.Q.damage,
                3: Constants.Q.heal,
                4: Constants.Q.screen_damage,
                5: Constants.Q.screen_heal
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.Q.heal.base},
            {labelIntlID: "ToolTipType/Theodore_ScreenFireDamage", values: Constants.Q.screen_damage.base},
            {labelIntlID: "ToolTipType/Theodore_ScreenFireHeal", values: Constants.Q.screen_heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
