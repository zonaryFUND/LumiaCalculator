import Constants from "./constants.json";
import { RatioPercent } from "../../../tooltip/skill/valueratio-to-string";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";

export const code = 1029100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.T.movement_speed),
        1: RatioPercent(Constants.T.attack_speed),
        2: Constants.T.damage.base,
        5: RatioPercent(Constants.T.damage.amp),
        6: Constants.T.cooldown.constant,
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
