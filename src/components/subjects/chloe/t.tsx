import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1040100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.T.nina_revive[skillLevel],
        1: `${Constants.T.nina_revive_cost}%`,
        2: `${Constants.T.nina_revive_hp}%`,
        8: Constants.T.damage.base[skillLevel],
        18: `${Constants.T.damage.ninaAttack}%`,
        21: Constants.T.damage
    }),
    expansion: ({ config }) => {
        const ratio = config.level * Constants.T.per_level_chloe_status_ratio + Constants.T.base_chloe_status_ratio;
        return {
            tipValues: {
                10: `${ratio}%`,
                11: `${ratio}%`,
                12: `${ratio}%`,
                13: `${ratio}%`,
                17: `${ratio}%`,
                19: `${Constants.T.per_level_chloe_status_ratio}%`,
                21: `${ratio}%`
            },
            enumeratedValues: [
                {labelIntlID: "ToolTipType/AdvancedBaseAttackNina", values: Constants.T.damage.base},
                {labelIntlID: "ToolTipType/ResurrectionTime", values: Constants.T.nina_revive},
                {labelIntlID: "ToolTipType/BonusAttack", values: Constants.T.nina_attack},
                {labelIntlID: "ToolTipType/BonusDefence", values: Constants.T.nina_defense},
                {labelIntlID: "ToolTipType/BonusHP", values: Constants.T.nina_maxhp},
            ]  
        }
    }
}
