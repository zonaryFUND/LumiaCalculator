import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation, config }) => {
        const skillLevel = config.skillLevels.Q;
        const amp = new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]).toString();

        return {
            0: showEquation ? Constants.Q.first_damage.base : Constants.Q.first_damage,
            1: RatioPercent(Constants.Q.first_damage.attack),
            2: Constants.Q.second,
            3: showEquation ? Constants.Q.second : Constants.Q.second_damage,
            4: showEquation ? Constants.Q.second_damage.base : Constants.Q.slow.duration,
            5: showEquation ? RatioPercent(Constants.Q.second_damage.attack) : RatioPercent(Constants.Q.slow.effect),
            6: showEquation ? Constants.Q.slow.duration : `${Constants.Q.vf_gauge[skillLevel][0]}, ${Constants.Q.vf_gauge[skillLevel][1]}`,
            7: showEquation ? RatioPercent(Constants.Q.slow.effect[skillLevel]) : RatioPercent(amp),
            8: `${Constants.Q.vf_gauge[skillLevel][0]}, ${Constants.Q.vf_gauge[skillLevel][1]}`,
            9: RatioPercent(amp)
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/AddVFGauge", values: Constants.Q.vf_gauge.map(v => `${v[0]}, ${v[1]}`)},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true}
        ]  
    })
}
