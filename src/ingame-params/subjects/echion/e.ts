import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import Decimal from "decimal.js";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1044400;

export const info: TooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation, config }) => {
        const amp = new Decimal(config.gauge).times(Constants.R.damage_amp_per_vf[config.skillLevels.R]);
        return {
            0: showEquation ? Constants.E.damage.base : Constants.E.damage,
            1: showEquation ? RatioPercent(Constants.E.damage.attack) : Constants.E.mark,
            2: showEquation ? Constants.E.mark : Constants.E.vf_gauge,
            3: showEquation ? Constants.E.vf_gauge : RatioPercent(amp.toString()),
            4: RatioPercent(amp.toString())
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
