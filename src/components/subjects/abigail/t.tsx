import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1067100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel }) => {
        return {
            0: Constants.T.cooldown_reduction,
            1: Constants.T.damage.base[skillLevel],
            2: `${Constants.T.damage.amp}%`,
            3: Constants.T.defense_reduction.duration,
            4: Constants.T.defense_reduction.effect[skillLevel],
            20: Constants.T.damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefense", values: Constants.T.defense_reduction.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
