import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1003100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.max_stack,
        2: Constants.T.movement_speed.duration,
        3: RatioPercent(Constants.T.movement_speed.effect),
        4: RatioPercent(Constants.T.q_cooldown_reduction),
        5: RatioPercent(Constants.T.cooldown_reduction),
        6: RatioPercent(Constants.T.damage.amp),
        7: Constants.T.damage.base,
        8: RatioPercent(Constants.T.heal.amp),
        9: Constants.T.heal.base,
        20: Constants.T.damage,
        21: Constants.T.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            { labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base },
            { labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true },
        ]
    })
}
