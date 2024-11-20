import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";

export const code = 1044200;

export const info: TooltipInfo = {
    skill: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation, config }) => {
        const amp = new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]).toString();
        return {
            0: showEquation ? Constants.Q.first_damage.base[skillLevel] : Constants.Q.first_damage,
            1: `${Constants.Q.first_damage.attack}%`,
            2: Constants.Q.second,
            3: showEquation ? Constants.Q.second : Constants.Q.second_damage,
            4: showEquation ? Constants.Q.second_damage.base[skillLevel] : Constants.Q.slow.duration,
            5: showEquation ? `${Constants.Q.second_damage.attack}%` : `${Constants.Q.slow.effect[skillLevel]}%`,
            6: showEquation ? Constants.Q.slow.duration : `${Constants.Q.vf_gauge[skillLevel][0]}, ${Constants.Q.vf_gauge[skillLevel][1]}`,
            7: showEquation ? `${Constants.Q.slow.effect[skillLevel]}%` : `${amp}%`,
            8: `${Constants.Q.vf_gauge[skillLevel][0]}, ${Constants.Q.vf_gauge[skillLevel][1]}`,
            9: `${amp}%`
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
