import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { AdditionalAttack } from "./perpetual-status";

export const code = 1078100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ status }) => {
        console.log(status.attackPower.sum)
        return {
       0: Constants.T.as_per_level,
       1: RatioPercent(Constants.T.as_conversion),
       2: RatioPercent(Constants.T.qe_cooldown_reduction),
       3: Constants.T.movement_speed.duration,
       4: RatioPercent(Constants.T.movement_speed.effect),
       5: RatioPercent(status.attackSpeed.multiplier.toNumber()),
       6: Constants.T.duration,
       7: Constants.T.max_stack,
       8: status.attackPower.sum.percent(AdditionalAttack(status.attackSpeed.multiplier)).floor().toNumber()
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.T.qe_cooldown_reduction, percent: true},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed.effect, percent: true}
        ]  
    })
}
