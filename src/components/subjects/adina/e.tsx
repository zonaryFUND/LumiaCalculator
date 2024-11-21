import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1052400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation, skillLevel, config, status }) => {
        const conjunctionHp = {
            base: Constants.R.star_conjunction.hp.base[config.skillLevels.R],
            amp: Constants.R.star_conjunction.hp.amp
        }
        const conjunctionSp = {
            base: Constants.R.star_conjunction.sp.base[config.skillLevels.R],
            amp: Constants.R.star_conjunction.sp.amp
        }

        const base = {
            4: Constants.E.moon,
            10: Constants.E.conjunction,
        }

        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base[skillLevel],
                7: Constants.E.sun.base,
                9: `${Constants.E.star}%`,
                11: conjunctionHp.base,
                12: `${conjunctionHp.amp}%`,
                13: `${Constants.E.damage.amp}%`,
                16: `${Constants.E.sun.amp}%`,
                17: conjunctionSp.base,
                18: `${conjunctionSp.amp}%`,
            } as Record<number, number | string | ValueRatio>
        } else {
            const moonHeal = calculateValue(Constants.E.damage, status, config, skillLevel).static
                .percent(Constants.E.star)
                .floor();
            return {
                ...base,
                20: Constants.E.damage,
                21: Constants.E.sun,
                22: moonHeal.toString(),
                24: conjunctionHp,
                25: conjunctionSp
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FallDamage", values: Constants.E.drop_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
