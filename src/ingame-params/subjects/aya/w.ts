import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1002300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.damage.base : Constants.W.damage,
        1: showEquation ? RatioPercent(Constants.W.damage.attack) : RatioPercent(Constants.W.per_as),
        2: Constants.W.duration,
        3: showEquation ? Constants.W.duration : Constants.W.bullets,
        4: showEquation ? Constants.W.bullets : Constants.W.max_bullets,
        5: RatioPercent(Constants.W.damage.amp),
        6: Constants.W.per_as,
        7: Constants.W.max_bullets
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/SkillSkillAmpCoef", values: Constants.W.damage.amp},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
