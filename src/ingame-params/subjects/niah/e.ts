import Constants from "./constants";
import { SkillTooltipProps, TooltipValue, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1081400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const common: TooltipValues = {
            0: Constants.E.duration,
            1: Constants.E.immortal
        }

        if (showEquation) {
            return {
                ...common,
                2: Constants.E.heal.maxHP.base,
                3: RatioPercent(Constants.E.heal.maxHP.amp),
                4: Constants.E.movement_speed.effect.base,
                5: RatioPercent(Constants.E.movement_speed.effect.amp),
                6: Constants.E.movement_speed.duration
            }
        } else {
            return {
                ...common,
                2: RatioPercent(Constants.E.heal.maxHP),
                3: RatioPercent(Constants.E.movement_speed.effect),
                4: Constants.E.movement_speed.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
