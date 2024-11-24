import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1023100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.wound_duration,
        1: Constants.T.wound,
        5: Constants.T.max_stack,
        6: Constants.T.wound_duration,
        7: RatioPercent(Constants.T.critical_wound.targetMaxHP),
        8: Constants.T.critical_wound,
        9: Constants.T.shield_duration,
        10: showEquation ? Constants.T.shield.base : Constants.T.shield,
        12: RatioPercent(Constants.T.movement_speed),
        13: RatioPercent(Constants.T.wound.amp),
        14: RatioPercent(Constants.T.critical_wound.amp),
        15: RatioPercent(Constants.T.shield.amp),
        16: RatioPercent(Constants.T.healing_reduction)
    }),
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.R.max_damage_target_hp)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true}
        ]  
    })
}
