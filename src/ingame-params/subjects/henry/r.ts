import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1083500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.cc_immune,
        3: RatioPercent(Constants.R.bullet_slow),
        5: RatioPercent(Constants.R.slow),
        7: Constants.R.stun,
        8: Constants.R.damage,
        9: Constants.R.finish_damage,
        10: Constants.R.shield,
        20: Constants.R.damage.base,
        21: RatioPercent(Constants.R.damage.amp),
        22: Constants.R.finish_damage.base,
        23: RatioPercent(Constants.R.finish_damage.amp),
        24: Constants.R.shield.base,
        25: RatioPercent(Constants.R.shield.amp),
        26: RatioPercent(Constants.R.shield.maxHP)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.finish_damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
