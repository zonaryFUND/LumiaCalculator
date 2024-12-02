import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import * as lyanhe from "./lyanhe";

export const code = 1063410;

export const info: SkillTooltipProps = {
    ...lyanhe.info,
    consumption: {
        type: "hp",
        value: Constants.GhostE.hp_cost
    },
    cooldown: Constants.GhostE.cooldown,
    expansion: () => ({
        tipValues: {
            0: Constants.GhostE.thrash.hit,
            1: Constants.GhostE.thrash.miss
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhE.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active3_Damage", values: Constants.GhostE.first_damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active3_PullDamage", values: Constants.GhostE.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.GhostE.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.GhostE.hp_cost}
        ]  
    })
}
