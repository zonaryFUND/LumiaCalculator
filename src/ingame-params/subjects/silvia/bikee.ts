import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016800;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.BikeE.cooldown,
    values: ({ }) => ({
        0: Constants.BikeE.damage.base,
        3: 0,
        4: Constants.BikeE.ms_max_damage,
        5: RatioPercent(Constants.BikeE.damage.amp),
        20: Constants.BikeE.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeE.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.BikeE.cooldown},
            {labelIntlID: "ToolTipType/DefaultMoveDamageRatio", values: Constants.BikeE.ms_max_damage}
        ]  
    })
}
