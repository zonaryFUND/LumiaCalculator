import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001100;

const healMax = {
    base: Constants.T.heal.base.map(v => v * Constants.T.max_heal_multiplier),
    attack: Constants.T.heal.attack * Constants.T.max_heal_multiplier
}

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.T.bleeding_duration
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.T.bleeding_damage.base,
                2: RatioPercent(Constants.T.bleeding_damage.attack),
                3: Constants.T.max_bleeding,
                4: Constants.T.adrenaline,
                5: Constants.T.damage.base,
                6: RatioPercent(Constants.T.damage.attack),
                7: Constants.T.heal.base,
                8: RatioPercent(Constants.T.heal.attack),
                9: healMax.base,
                10: RatioPercent(healMax.attack),
                11: RatioPercent(Constants.T.max_heal_threshold)
            }
        } else {
            return {
                ...base,
                1: Constants.T.bleeding_damage,
                2: Constants.T.max_bleeding,
                3: Constants.T.adrenaline,
                4: Constants.T.damage,
                5: Constants.T.heal,
                6: healMax,
                7: RatioPercent(Constants.T.max_heal_threshold)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BleedDanage", values: Constants.T.bleeding_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/R1AdditionalAttackPower", values: Constants.T.damage.attack, percent: true},
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base}
        ]  
    })
}
