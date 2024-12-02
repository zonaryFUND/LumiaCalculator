import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1074300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.slow.duration,
        1: RatioPercent(Constants.W.slow.effect),
        2: showEquation ? RatioPercent(Constants.W.additional_shield.maxHP) : Constants.W.additional_shield,
        3: Constants.W.attack.duration,
        4: RatioPercent(Constants.W.attack.effect),
        5: Constants.W.shield.base,
        6: RatioPercent(Constants.W.shield.attack),
        20: Constants.W.shield
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/DecreaseAttackPower", values: Constants.W.attack.effect},
        ]  
    })
}
