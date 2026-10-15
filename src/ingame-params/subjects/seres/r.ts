import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1091500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.unstoppable,
        1: Constants.R.shield,
        2: Constants.R.tick,
        3: Constants.R.shield,
        4: Constants.R.shield_aftereffect,
        5: Constants.R.cancellable,
        20: Constants.R.shield.base,
        21: RatioPercent(Constants.R.shield.amp),
        22: RatioPercent(Constants.R.shield.maxHP),
        23: Constants.R.shield.base,
        24: RatioPercent(Constants.R.shield.amp),
        25: RatioPercent(Constants.R.shield.maxHP)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
