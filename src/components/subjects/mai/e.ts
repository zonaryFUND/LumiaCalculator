import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1045400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.shield.base,
        1: RatioPercent(Constants.E.shield.defense),
        2: Constants.E.shield_duration,
        6: Constants.E.damage.base,
        8: Constants.E.taunt,
        9: Constants.E.reuse,
        10: RatioPercent(Constants.E.shield.amp),
        11: RatioPercent(Constants.E.damage.amp),
        12: RatioPercent(Constants.E.shield.amp),
        13: RatioPercent(Constants.E.damage.defense),
        20: Constants.E.shield,
        21: Constants.E.damage,
        22: Constants.E.shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.E.shield.base},
            {labelIntlID: "ToolTipType/TauntTime", values: Constants.E.taunt},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
