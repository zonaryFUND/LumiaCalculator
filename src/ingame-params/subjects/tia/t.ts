import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1048100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.yr.duration,
        1: Constants.T.yr.count,
        2: Constants.T.yr.damage.base,
        6: Constants.T.rb.damage.base,
        9: Constants.T.rb.movement_speed.duration,
        10: RatioPercent(Constants.T.rb.movement_speed.effect),
        12: Constants.T.by.damage.base,
        15: Constants.T.by.bind,
        18: Constants.T.yr.damage,
        19: Constants.T.rb.damage,
        20: Constants.T.by.damage,
        22: RatioPercent(Constants.T.yr.damage.amp),
        24: RatioPercent(Constants.T.rb.damage.amp),
        26: RatioPercent(Constants.T.by.damage.amp),
        27: RatioPercent(Constants.T.rb.heal)
    }),
    expansion: ({ status }) => ({
        tipValues: {
            16: status.skillAmp.overrideAdditional?.value?.toString() ?? ""
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Squirrel1_FixedDamage", values: Constants.T.yr.damage.base},
            {labelIntlID: "ToolTipType/Squirrel2_FixedDamage", values: Constants.T.rb.damage.base},
            {labelIntlID: "ToolTipType/Squirrel2_Movespeed", values: Constants.T.rb.movement_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/Squirrel3_FixedDamage", values: Constants.T.by.damage.base}
        ]  
    })
}
