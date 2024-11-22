import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1041500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, status, config }) => {
        const base = {
            4: Constants.R.duration,
            5: Constants.R.defense[skillLevel],
            6: Constants.R.heal_per_sec.base[skillLevel],
            10: `${Constants.R.heal_per_sec.amp}%`
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base[skillLevel],
                2: Constants.R.heal.base[skillLevel],
                3: `${Constants.R.heal.targetLostHP[skillLevel]}%`,
                8: `${Constants.R.damage.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.R.heal,
                3: `${Constants.R.heal.targetLostHP}%`,
                20: Constants.R.damage,
                21: Constants.R.heal_per_sec
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/FirstHeal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/FirstHealLostHP", values: Constants.R.heal.targetLostHP, percent: true},
            {labelIntlID: "ToolTipType/DotHeal", values: Constants.R.heal_per_sec.base},
            {labelIntlID: "ToolTipType/IncreaseDefence", values: Constants.R.defense},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
