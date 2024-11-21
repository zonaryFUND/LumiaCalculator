import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1055100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation, status, config }) => {
        if (showEquation) {
            return {
                0: Constants.T.heal_period,
                1: `${Constants.T.heal.maxHP[skillLevel]}%`,
                2: `${Constants.T.heal.amp}%`,
                3: Constants.T.revive[skillLevel],
                4: `${Constants.T.additional_heal.targetMaxHP.base[skillLevel]}%`,
                5: `${Constants.T.additional_heal.targetMaxHP.amp}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.heal_period,
                1: Constants.T.heal,
                2: Constants.T.revive[skillLevel],
                3: `${calculateValue(Constants.T.additional_heal.targetMaxHP, status, config, skillLevel).static.floor().toString()}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/MaxHpCoef", values: Constants.T.heal.maxHP, percent: true},
            {labelIntlID: "ToolTipType/DecreaseRevivalTime", values: Constants.T.revive},
            {labelIntlID: "ToolTipType/AddHpRevival", values: Constants.T.additional_heal.targetMaxHP.base, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
