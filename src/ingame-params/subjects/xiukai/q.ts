import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1013200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "hp",
        value: Constants.Q.hp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        3: RatioPercent(Constants.Q.slow),
        4: RatioPercent(Constants.Q.damage.amp),
        5: RatioPercent(Constants.Q.damage.maxHP),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.hp_cost},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow, percent: true}
        ]  
    })
}
