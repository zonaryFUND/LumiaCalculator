import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { accelerando } from "./perpetual-status";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1075100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation, config }) => {
        const accelerandoValue = accelerando(config);

        if (showEquation) {
            return {
                0: RatioPercent(Constants.T.stack_gain_threshold),
                1: Constants.T.additional_damage.base,
                2: RatioPercent(Constants.T.additional_damage.amp),
                3: Constants.T.additional_damage.stack,
                4: Constants.T.cdr_per_accelerando,
                5: Constants.T.cooldown.constant,
                6: accelerandoValue.toString(),
                7: Constants.T.max_cdr,
                8: Constants.T.r_cdr_conversion
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: RatioPercent(Constants.T.stack_gain_threshold),
                1: Constants.T.additional_damage,
                2: Constants.T.cdr_per_accelerando,
                3: Constants.T.cooldown.constant,
                4: accelerandoValue.toString(),
                5: Constants.T.max_cdr,
                6: Constants.T.r_cdr_conversion
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            1: Constants.T.stack_conversion
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.additional_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
