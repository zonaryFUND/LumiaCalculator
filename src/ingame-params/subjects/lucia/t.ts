import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1090100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            0: Constants.T.crystal_duration,
            2: RatioPercent(Constants.T.movement_speed.effect),
            3: Constants.T.movement_speed.duration,
            4: RatioPercent(Constants.T.attack_speed)
        }
        if (showEquation) {
            return {
                ...common,
                20: Constants.T.damage.base,
                21: RatioPercent(Constants.T.damage.amp)
            }
        } else {
            return {
                ...common,
                1: Constants.T.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect}
        ]
    })
}
