import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { accelerando, cdr } from "./status-override";

export const code = 1075100;

export const info: TooltipInfo = {
    skill: "T",
    cooldown: Constants.T.cooldown,
    values: ({ skillLevel, showEquation, config }) => {
        const accelerandoValue = accelerando(config);
        const cdrValue = cdr(accelerandoValue);

        if (showEquation) {
            return {
                0: `${Constants.T.stack_gain_threshold}`,
                1: Constants.T.additional_damage.base[skillLevel],
                2: `${Constants.T.additional_damage.amp}%`,
                3: Constants.T.additional_damage.stack,
                4: `${cdrValue.toString()}%`,
                5: Constants.T.cooldown.constant[skillLevel],
                6: accelerandoValue.toString()
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: `${Constants.T.stack_gain_threshold}`,
                1: Constants.T.additional_damage,
                2: `${cdrValue.toString()}%`,
                3: Constants.T.cooldown.constant[skillLevel],
                4: accelerandoValue.toString()
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: 1,
            1: Constants.T.stack_conversion,
            2: Constants.T.stack_conversion_limit
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
