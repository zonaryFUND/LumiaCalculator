import Constants from "./constants.json";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1029100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.T.movement_speed),
        1: RatioPercent(Constants.T.attack_speed),
        2: Constants.T.damage.base,
        5: RatioPercent(Constants.T.damage.amp),
        6: Constants.T.cooldown.constant,
        20: Constants.T.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.T.movement_speed, percent: true},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant}
        ]  
    })
}
