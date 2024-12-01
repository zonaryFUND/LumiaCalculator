import Constants from "./constants.json";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";
import { TooltipProps, TooltipValue } from "components/tooltip/skill/tooltip-props";

export const code = 1031200;

export const info: TooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.Q.max_stack,
            1: Constants.Q.hankyu_duration,
            2: RatioPercent(Constants.Q.movement_speed),
            3: RatioPercent(Constants.Q.attack_speed),
            4: "1%",
            5: RatioPercent(Constants.Q.daikyu_damage_enhance),
            6: {value: Constants.Q.daikyu_range, expression: v => `${v}m`},
        } satisfies Record<number, TooltipValue>
        if (showEquation) {
            return {
                ...base,
                7: RatioPercent(Constants.Q.hankyu.attack),
                8: RatioPercent(Constants.Q.hankyu.attack),
                9: RatioPercent(Constants.Q.daikyu.attack)
            }
        } else {
            return {
                ...base,
                7: Constants.Q.hankyu,
                8: Constants.Q.hankyu,
                9: Constants.Q.daikyu
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/KaichuMoveSpeedUpRatio", values: Constants.Q.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/KaichuAttackSpeedUpRatio", values: Constants.Q.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/YumiAttackRange", values: Constants.Q.daikyu_range}
        ]  
    })
}
