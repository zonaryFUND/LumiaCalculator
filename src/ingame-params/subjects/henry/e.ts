import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1083400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.channeling,
        1: Constants.E.bind,
        2: Constants.E.movement_speed.duration,
        3: RatioPercent(Constants.E.movement_speed.effect),
        4: RatioPercent(Constants.E.q_cooldown_reduction),
        5: RatioPercent(Constants.E.w_cooldown_reduction),
        6: Constants.E.damage,
        20: Constants.E.damage.base,
        21: RatioPercent(Constants.E.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
