import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1078100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
       0: Constants.T.as_per_level,
       1: RatioPercent(Constants.T.as_conversion),
       2: RatioPercent(Constants.T.qe_cooldown_reduction),
       3: Constants.T.movement_speed.duration,
       4: RatioPercent(Constants.T.movement_speed.effect),
       6: Constants.T.duration,
       7: Constants.T.max_stack 
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.qe_cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
