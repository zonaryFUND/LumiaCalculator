import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1050100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: RatioPercent(Constants.T.slow),
            1: Constants.T.frozen,
            2: Constants.T.stun
        }

        if (showEquation) {
            return {
                ...base,
                3: Constants.T.damage.base,
                6: RatioPercent(Constants.T.damage.defense),
                7: RatioPercent(Constants.T.damage.amp),
                8: Constants.T.chill
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.T.damage,
                6: Constants.T.chill
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.T.immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
