import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1014300;

const maxShield = {
    base: Constants.W.shield.base.map(v => v * (100 + Constants.W.max_shield) / 100),
    amp: Constants.W.shield.amp * (100 + Constants.W.max_shield) / 100
}

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.duration,
        1: Constants.W.reuse,
        2: showEquation ? Constants.W.damage.base : Constants.W.damage,
        3: Constants.W.shield,
        4: showEquation ? Constants.W.shield.base : RatioPercent(Constants.W.damage.targetMaxHP),
        5: maxShield,
        6: RatioPercent(Constants.W.damage.amp),
        7: RatioPercent(Constants.W.shield.amp),
        9: RatioPercent(Constants.W.damage.targetMaxHP),
        10: maxShield.base,
        12: RatioPercent(maxShield.amp)

    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.W.max_shield_hp),
            1: RatioPercent(Constants.W.max_shield)
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
