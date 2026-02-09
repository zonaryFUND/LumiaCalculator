import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1005400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.damage.base,
        2: Constants.E.airborne,
        4: Constants.E.enhanced_airborne,
        5: RatioPercent(Constants.E.damage.amp),
        6: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
