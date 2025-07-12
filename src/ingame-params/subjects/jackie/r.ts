import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001500;

const maxDamage = {
    base: Constants.R.damage.base.map(v => v * Constants.R.finish_multiplier_max),
    attack: Constants.R.damage.attack * Constants.R.finish_multiplier_max
}

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.R.duration,
            1: RatioPercent(Constants.R.movement_speed),
            2: RatioPercent(Constants.R.attack_speed),
            3: Constants.R.extend
        }
        if (showEquation) {
            return {
                ...base,
                4: Constants.R.damage.base,
                5: RatioPercent(Constants.R.damage.attack),
                6: maxDamage.base,
                7: RatioPercent(maxDamage.attack),
                8: RatioPercent(Constants.R.heal)
            }
        } else {
            return {
                ...base,
                4: Constants.R.damage,
                5: maxDamage,
                6: RatioPercent(Constants.R.heal)
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.finish_multiplier_max_hp)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Time", values: Constants.R.duration},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.R.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.R.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/ChainSawDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
