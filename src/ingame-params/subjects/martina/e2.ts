import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057430;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E2.sp_cost
    },
    cooldown: Constants.E2.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.E2.movement_speed),
        1: Constants.E2.damage.base,
        2: RatioPercent(Constants.E2.damage.attack),
        3: Constants.E2.stun,
        4: RatioPercent(Constants.E2.heal),
        6: Constants.E2.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E2.cooldown},
            {labelIntlID: "ToolTipType/HpRegenRatio", values: Constants.E2.heal, percent: true}
        ]  
    })
}
