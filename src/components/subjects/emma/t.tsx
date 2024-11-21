import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1019100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.T.cooldown.constant[skillLevel],
            5: `${Constants.T.attack_speed}%`
        }
        if (showEquation) {
            return {
                ...base,
                1: `${Constants.T.damage.maxSP}%`,
                2: Constants.T.shield.base[skillLevel],
                3: `${Constants.T.shield.maxSP}%`,
                10: `${Constants.T.shield.amp[skillLevel]}%`,
                11: `${Constants.T.damage.amp[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.T.damage,
                3: Constants.T.shield,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageAmpCoef", values: Constants.T.damage.amp, percent: true},
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/ShieldSkillAmpCoef", values: Constants.T.shield.amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
