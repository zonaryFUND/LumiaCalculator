import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1076400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "hp-ratio",
        value: Constants.E.hp_cost_percent
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.amp),
                2: RatioPercent(Constants.E.damage.maxHP),
                3: Constants.E.stun
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.E.damage,
                1: Constants.E.stun
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
