import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1052400;

const starHeal = {
    base: Constants.E.damage.base.map(v => v * Constants.E.star / 100),
    amp: Constants.E.damage.amp * Constants.E.star / 100
}

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation, config }) => {
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
                0: Constants.E.damage.base,
                7: Constants.E.sun.base,
                9: RatioPercent(Constants.E.star),
                11: conjunctionHp.base,
                12: RatioPercent(conjunctionHp.amp),
                13: RatioPercent(Constants.E.damage.amp),
                16: RatioPercent(Constants.E.sun.amp),
                17: conjunctionSp.base,
                18: RatioPercent(conjunctionSp.amp),
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                20: Constants.E.damage,
                21: Constants.E.sun,
                22: starHeal,
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
