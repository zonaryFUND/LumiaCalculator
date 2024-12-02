import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1042500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "hp-ratio",
        value: Constants.R.hp_cost_percent
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.R.first_damage.base : Constants.R.first_damage,
        2: RatioPercent(Constants.R.first_damage.targetMaxHP),
        3: RatioPercent(Constants.R.slow.effect),
        4: RatioPercent(Constants.R.omnisyphon_amp),
        5: showEquation ? `${Constants.R.min_damage.base}` : Constants.R.min_damage,
        6: Constants.R.max_damage,
        7: Constants.R.max_damage.base,
        9: showEquation ? Constants.R.heal.base : Constants.R.heal,
        11: RatioPercent(Constants.R.heal.lostHP),
        12: RatioPercent(Constants.R.multiple_hit_heal_amp),
        13: showEquation ? RatioPercent(Constants.R.first_damage.amp) : Constants.R.slow.duration,
        14: RatioPercent(Constants.R.min_damage.amp),
        15: RatioPercent(Constants.R.max_damage.amp),
        16: RatioPercent(Constants.R.heal.amp),
        17: Constants.R.slow.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxAdditionalDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/LifeSteal", values: Constants.R.omnisyphon_amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
