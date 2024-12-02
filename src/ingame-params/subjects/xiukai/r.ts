import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1013500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "hp",
        value: Constants.R.hp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        1: Constants.R.damage.base,
        5: Constants.R.slow.duration,
        6: RatioPercent(Constants.R.slow.effect),
        7: Constants.R.count,
        9: RatioPercent(Constants.R.damage.amp),
        10: RatioPercent(Constants.R.damage.maxHP),
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.R.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.hp_cost}
        ]  
    })
}
