import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1030500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.R.duration,
            2: Constants.R.tick
        }
        if (showEquation) {
            return {
                ...base,
                1: RatioPercent(Constants.R.heal.maxHP),
                3: Constants.R.damage.base,
                4: RatioPercent(Constants.R.damage.attack),
                5: RatioPercent(Constants.R.damage.additionalMaxHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.R.heal,
                3: Constants.R.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/MaxHpHealRatio", values: Constants.R.heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
