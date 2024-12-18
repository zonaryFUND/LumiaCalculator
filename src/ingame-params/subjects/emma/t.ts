import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1019100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.cooldown.constant,
            5: RatioPercent(Constants.T.attack_speed)
        }
        if (showEquation) {
            return {
                ...base,
                1: RatioPercent(Constants.T.damage.maxSP),
                2: Constants.T.shield.base,
                3: RatioPercent(Constants.T.shield.maxSP),
                10: RatioPercent(Constants.T.shield.amp),
                11: RatioPercent(Constants.T.damage.amp)
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
