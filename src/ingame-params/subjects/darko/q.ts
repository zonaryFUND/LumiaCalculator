import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1074200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.movement_speed.duration,
        1: RatioPercent(Constants.Q.movement_speed.effect),
        2: RatioPercent(Constants.Q.damage.targetMaxHP),
        3: Constants.Q.mark,
        4: RatioPercent(Constants.Q.mark_enhance),
        5: Constants.Q.damage.base,
        6: RatioPercent(Constants.Q.damage.attack),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.Q.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/IncreaseDamageRatio", values: Constants.Q.mark_enhance, percent: true},
        ]  
    })
}
