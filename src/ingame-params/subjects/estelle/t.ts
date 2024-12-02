import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1055100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.heal_period,
                1: RatioPercent(Constants.T.heal.maxHP),
                2: RatioPercent(Constants.T.heal.amp),
                3: Constants.T.revive,
                4: RatioPercent(Constants.T.additional_heal.targetMaxHP.base),
                5: RatioPercent(Constants.T.additional_heal.targetMaxHP.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.heal_period,
                1: Constants.T.heal,
                2: Constants.T.revive,
                3: RatioPercent(Constants.T.additional_heal.targetMaxHP)
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
