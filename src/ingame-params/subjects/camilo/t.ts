import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1039100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: RatioPercent(Constants.T.attack_speed),
        2: Constants.T.duration,
        3: showEquation ? Constants.T.shield.base : Constants.T.shield,
        4: showEquation ? RatioPercent(Constants.T.shield.attack) : Constants.T.wt_cooldown_reduction,
        5: Constants.T.wt_cooldown_reduction,
        6: Constants.T.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Shield", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
        ]  
    })
}
