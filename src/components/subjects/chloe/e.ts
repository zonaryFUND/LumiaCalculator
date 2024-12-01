import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1040400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.first_damage.base,
        1: RatioPercent(Constants.E.first_damage.attack),
        2: Constants.E.second_damage.base,
        3: RatioPercent(Constants.E.second_damage.ninaAttack),
        6: Constants.E.first_damage,
        7: Constants.E.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageScratch", values: Constants.E.first_damage.base},
            {labelIntlID: "ToolTipType/DamageNina", values: Constants.E.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
