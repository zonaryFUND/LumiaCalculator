import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { accelerando, cdr } from "./status-override";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1075100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation, config }) => {
        const accelerandoValue = accelerando(config);
        const cdrValue = cdr(accelerandoValue);

        if (showEquation) {
            return {
                0: RatioPercent(Constants.T.stack_gain_threshold),
                1: Constants.T.additional_damage.base,
                2: RatioPercent(Constants.T.additional_damage.amp),
                3: Constants.T.additional_damage.stack,
                4: RatioPercent(cdrValue.toString()),
                5: Constants.T.cooldown.constant,
                6: accelerandoValue.toString()
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: RatioPercent(Constants.T.stack_gain_threshold),
                1: Constants.T.additional_damage,
                2: RatioPercent(cdrValue.toString()),
                3: Constants.T.cooldown.constant,
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
