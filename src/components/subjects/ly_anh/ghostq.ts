import Constants from "./constants.json";
import * as humanq from "./lyanhq";
import { TooltipInfo } from "../dictionary";

export const code = 1063210;

export const info: TooltipInfo = {
    ...humanq.info,
    consumption: {
        type: "hp",
        value: Constants.GhostQ.hp_cost
    },
    cooldown: Constants.GhostQ.cooldown,
    expansion: () => ({
        tipValues: {
            0: Constants.GhostQ.thrash.hit,
            1: Constants.GhostQ.thrash.miss
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhQ.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active1_Damage", values: Constants.GhostQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.GhostQ.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.GhostQ.hp_cost},
        ]
    })
};
