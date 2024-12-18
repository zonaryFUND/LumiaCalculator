import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import * as lyanhw from "./lyanhw";

export const code = 1063310;

export const info: SkillTooltipProps = {
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
