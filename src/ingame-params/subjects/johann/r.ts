import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1041500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            4: Constants.R.duration,
            5: Constants.R.defense,
            6: Constants.R.heal_per_sec.base,
            10: RatioPercent(Constants.R.heal_per_sec.amp)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base,
                2: Constants.R.heal.base,
                3: RatioPercent(Constants.R.heal.targetLostHP),
                8: RatioPercent(Constants.R.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.R.heal,
                3: RatioPercent(Constants.R.heal.targetLostHP),
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
