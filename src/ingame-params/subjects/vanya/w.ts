import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Decimal from "decimal.js";

export const code = 1064300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ status }) => ({
        0: Constants.W.first_damage,
        1: 3,
        2: RatioPercent(Constants.W.movement_speed),
        3: Constants.W.count,
        4: Constants.W.second_damage,
        5: Constants.W.untargettable,
        6: new Decimal(Constants.W.cooldown * Constants.W.cooldown_increase).subPercent(status.cooldownReduction.calculatedValue).toString(),
        10: Constants.W.first_damage.base,
        11: RatioPercent(Constants.W.first_damage.amp),
        12: Constants.W.second_damage.base,
        13: RatioPercent(Constants.W.second_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/VanyaWindDamage", values: Constants.W.first_damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.W.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/VanyaCloudDamage", values: Constants.W.second_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
