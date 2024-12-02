import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1040100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.nina_revive,
        1: RatioPercent(Constants.T.nina_revive_cost),
        2: RatioPercent(Constants.T.nina_revive_hp),
        8: Constants.T.damage.base,
        18: RatioPercent(Constants.T.damage.ninaAttack),
        21: Constants.T.damage
    }),
    expansion: ({ config }) => {
        const ratio = config.level * Constants.T.per_level_chloe_status_ratio + Constants.T.base_chloe_status_ratio;
        return {
            tipValues: {
                10: RatioPercent(ratio),
                11: RatioPercent(ratio),
                12: RatioPercent(ratio),
                13: RatioPercent(ratio),
                17: RatioPercent(ratio),
                19: RatioPercent(Constants.T.per_level_chloe_status_ratio),
                21: RatioPercent(ratio)
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
