import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1042300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.max_duration,
        1: RatioPercent(Constants.W.damage_reduction),
        2: Constants.W.heal_tick,
        3: RatioPercent(Constants.W.heal.maxHP),
        4: RatioPercent(Constants.W.enhance_threshold),
        5: Constants.W.cooldown_reduction.per,
        6: Constants.W.cooldown_reduction.value
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseDamageRatio", values: Constants.W.damage_reduction},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
