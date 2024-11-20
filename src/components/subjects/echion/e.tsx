import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";

export const code = 1044400;

export const info: TooltipInfo = {
    skill: "E",
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation, config }) => {
        const amp = new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]);
        return {
            0: showEquation ? Constants.E.damage.base[skillLevel] : Constants.E.damage,
            1: showEquation ? `${Constants.E.damage.attack}%` : Constants.E.mark,
            2: showEquation ? Constants.E.mark : Constants.E.vf_gauge[skillLevel],
            3: showEquation ? Constants.E.vf_gauge[skillLevel] : `${amp.toString()}%`,
            4: `${amp.toString()}%`
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/AddVFGauge", values: Constants.E.vf_gauge},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
