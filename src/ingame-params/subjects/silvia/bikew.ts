import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1016700;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.BikeW.cooldown,
    values: ({ }) => ({
        0: Constants.BikeW.damage.base,
        2: RatioPercent(Constants.BikeW.damage.amp),
        3: Constants.BikeW.airborne,
        20: Constants.BikeW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.BikeW.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.BikeW.cooldown},
        ]  
    })
}
