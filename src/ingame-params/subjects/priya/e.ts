import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1051400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.damage.base,
        2: Constants.E.slow.duration,
        3: Constants.E.bind,
        4: RatioPercent(Constants.E.damage.amp),
        5: RatioPercent(Constants.E.slow.effect),
        6: RatioPercent(Constants.E.movement_speed),
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base }
        ]
    })
}
