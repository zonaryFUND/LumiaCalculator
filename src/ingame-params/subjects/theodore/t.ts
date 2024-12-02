import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1062100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.hide,
        1: RatioPercent(Constants.T.movement_speed),
        2: Constants.T.shield_duration,
        3: RatioPercent(Constants.T.shield.maxHP),
        4: RatioPercent(Constants.T.q_cooldown_reduction),
        8: RatioPercent(Constants.T.cooldown_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/MaxHpShieldRatio", values: Constants.T.shield.maxHP, percent: true},
            {labelIntlID: "ToolTipType/Theodore_Active1CoolDown", values: Constants.T.q_cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/Theodore_Active2CoolDown", values: Constants.T.cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/Theodore_Active3CoolDown", values: Constants.T.cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
