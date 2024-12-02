import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1063200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "hp",
        value: Constants.LyAnhQ.hp_cost
    },
    cooldown: Constants.LyAnhQ.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.LyAnhQ.damage.base,
                1: RatioPercent(Constants.LyAnhQ.damage.attack),
                2: Constants.GhostQ.damage.base,
                3: RatioPercent(Constants.GhostQ.damage.attack),
                4: Constants.GhostQ.bind
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.LyAnhQ.damage,
                1: Constants.GhostQ.damage,
                2: Constants.GhostQ.bind
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.LyAnhQ.thrash
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhQ.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active1_Damage", values: Constants.GhostQ.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.LyAnhQ.cooldown},
        ]  
    })
}
