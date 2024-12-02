import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1020500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage.base,
        2: Constants.R.move_damage,
        3: Constants.R.duration,
        4: Constants.R.tick,
        5: Constants.R.enhanced_move_damage,
        6: RatioPercent(Constants.R.damage.amp),
        7: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/TrueDamage", values: Constants.R.move_damage},
            {labelIntlID: "ToolTipType/FettedTrueDamage", values: Constants.R.enhanced_move_damage},
            {labelIntlID: "ToolTipType/Time", values: Constants.R.duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
