import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1014300;

const maxShield = {
    base: Constants.W.shield.base.map(v => v * (100 + Constants.W.max_shield) / 100),
    amp: Constants.W.shield.amp * (100 + Constants.W.max_shield) / 100
}

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.duration,
        1: Constants.W.reuse,
        2: showEquation ? Constants.W.damage.base[skillLevel] : Constants.W.damage,
        3: Constants.W.shield,
        4: showEquation ? Constants.W.shield.base[skillLevel] : `${Constants.W.damage.targetMaxHP[skillLevel]}%`,
        5: maxShield,
        6: `${Constants.W.damage.amp}%`,
        7: `${Constants.W.shield.amp}%`,
        9: `${Constants.W.damage.targetMaxHP[skillLevel]}%`,
        10: maxShield.base[skillLevel],
        12: `${maxShield.amp}%`

    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.W.max_shield_hp}%`,
            1: `${Constants.W.max_shield}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.W.damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
