import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1055500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.R.self.shield.base[skillLevel],
                1: `${Constants.R.self.shield.amp}%`,
                2: `${Constants.R.self.shield.lostHP}%`,
                3: Constants.R.self.duration,
                4: Constants.R.self.channel,
                5: Constants.R.self.damage.base[skillLevel],
                6: `${Constants.R.self.damage.amp}%`,
                7: `${Constants.R.self.damage.maxHP}%`,
                8: Constants.R.self.slow.duration,
                9: `${Constants.R.self.slow.effect}`,
                10: Constants.R.ally.shield.base[skillLevel],
                11: `${Constants.R.ally.shield.amp}%`,
                12: `${Constants.R.ally.shield.targetLostHP}%`,
                13: Constants.R.ally.duration,
                14: Constants.R.ally.channel,
                15: Constants.R.ally.damage.base[skillLevel],
                16: `${Constants.R.ally.damage.amp}%`,
                17: `${Constants.R.ally.damage.maxHP}%`,
                18: Constants.R.ally.airborne
            } as Record<number, number | string | ValueRatio>
        } else {
            const { maxHP: _0, ...selfDamage } = Constants.R.self.damage
            const { maxHP: _1, ...allyDamage } = Constants.R.ally.damage
            return {
                0: Constants.R.self.shield,
                1: `${Constants.R.self.shield.lostHP}%`,
                2: Constants.R.self.duration,
                3: Constants.R.self.channel,
                4: selfDamage,
                5: `${Constants.R.self.damage.maxHP}%`,
                6: Constants.R.self.slow.duration,
                7: `${Constants.R.self.slow.effect}%`,
                8: Constants.R.ally.shield,
                9: `${Constants.R.ally.shield.targetLostHP}%`,
                10: Constants.R.ally.duration,
                11: Constants.R.ally.channel,
                12: allyDamage,
                13: `${Constants.R.ally.damage.maxHP}%`,
                14: Constants.R.ally.airborne
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleSkillDamage4_1", values: Constants.R.self.damage.base},
            {labelIntlID: "ToolTipType/EstelleProtection4_1", values: Constants.R.self.shield.base},
            {labelIntlID: "ToolTipType/EstelleSkillDamage4_2", values: Constants.R.ally.damage.base},
            {labelIntlID: "ToolTipType/EstelleProtection4_2", values: Constants.R.ally.shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
