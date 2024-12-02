import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import * as lyanhw from "./lyanhw";

export const code = 1063310;

export const info: TooltipProps = {
    ...lyanhw.info,
    consumption: {
        type: "hp",
        value: Constants.GhostW.hp_cost
    },
    cooldown: Constants.GhostW.cooldown,
    expansion: () => ({
        tipValues: {
            0: Constants.GhostW.thrash.hit,
            1: Constants.GhostW.thrash.miss
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhW.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active2_Damage", values: Constants.GhostW.damage.base}
        ]  
    })
}
