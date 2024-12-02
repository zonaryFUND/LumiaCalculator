import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1063100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: RatioPercent(Constants.LyAnhT.additional_damage.attack),
                1: RatioPercent(Constants.LyAnhT.human_basic_attack.attack),
                2: RatioPercent(Constants.LyAnhT.possessed_basic_attack.attack),
                3: RatioPercent(Constants.LyAnhT.ghost_basic_attack.attack),
                7: Constants.LyAnhT.thrash_decline,
                8: RatioPercent(Constants.LyAnhT.possesed_heal),
                9: RatioPercent(Constants.LyAnhT.ghost_heal),
                10: RatioPercent(Constants.LyAnhT.possessing_heal.lostHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.LyAnhT.additional_damage,
                1: RatioPercent(Constants.LyAnhT.human_basic_attack.attack),
                2: RatioPercent(Constants.LyAnhT.possessed_basic_attack.attack),
                3: RatioPercent(Constants.LyAnhT.ghost_basic_attack.attack),
                7: Constants.LyAnhT.thrash_decline,
                8: RatioPercent(Constants.LyAnhT.possesed_heal),
                9: RatioPercent(Constants.LyAnhT.ghost_heal),
                10: RatioPercent(Constants.LyAnhT.possessing_heal.lostHP)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.LyAnhT.human_thrash,
            1: Constants.LyAnhT.possessed_thrash
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AddFixedDamage", values: Constants.LyAnhT.additional_damage.attack, percent: true}
        ]  
    })
}
