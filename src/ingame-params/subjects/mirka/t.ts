import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { calculateValue } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1085100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        0: RatioPercent(Constants.T.max_hp_ratio),
        1: RatioPercent(Constants.T.gauge_gain),
        2: RatioPercent(Constants.T.cooldown_reduction),
        3: Constants.T.dot.duration,
        4: RatioPercent(Constants.T.dot.value.targetMaxHP),
        5: Constants.T.dot.value.base
    }),
    expansion: ({ config, status }) => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/TargetMaxHpCoef", values: Constants.T.dot.value.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.dot.value.base}
        ]  
    })
}
