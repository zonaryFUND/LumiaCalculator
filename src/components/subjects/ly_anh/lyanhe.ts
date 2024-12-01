import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1063400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "hp",
        value: Constants.LyAnhE.hp_cost
    },
    cooldown: Constants.LyAnhE.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.LyAnhE.damage.base,
                1: RatioPercent(Constants.LyAnhE.damage.attack),
                2: Constants.GhostE.first_damage.base,
                3: RatioPercent(Constants.GhostE.first_damage.attack),
                4: Constants.GhostE.second_damage.base,
                5: RatioPercent(Constants.GhostE.second_damage.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.LyAnhE.damage,
                1: Constants.GhostE.first_damage,
                2: Constants.GhostE.second_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.LyAnhE.thrash
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhE.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active3_Damage", values: Constants.GhostE.first_damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active3_PullDamage", values: Constants.GhostE.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.LyAnhE.cooldown},
        ]  
    })
}
