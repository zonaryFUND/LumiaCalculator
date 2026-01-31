import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1017200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.tick,
        2: Constants.Q.damage.base,
        3: RatioPercent(Constants.Q.damage.amp),
        20: Constants.Q.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.Q.damage.amp, percent: true}
        ]  
    })
}
