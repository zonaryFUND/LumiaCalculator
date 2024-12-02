import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1015100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.heal.min,
        1: Constants.T.heal.max,
        2: Constants.T.amp.min,
        3: Constants.T.amp.max,
        4: Constants.T.damage.base,
        6: Constants.T.slow.duration,
        7: RatioPercent(Constants.T.slow.effect),
        8: RatioPercent(Constants.T.damage.amp),
        9: Constants.T.damage,
        10: Constants.T.damage.level
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxHpRegen", values: Constants.T.heal.max},
            {labelIntlID: "ToolTipType/MaxSkill", values: Constants.T.amp.max},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.T.slow.effect, percent: true}
        ]  
    })
}
