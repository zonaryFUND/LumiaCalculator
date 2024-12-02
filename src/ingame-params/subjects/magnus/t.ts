import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1004100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => ({
        0: RatioPercent(Constants.T.defense),
        1: Constants.T.max_stack,
        2: Constants.T.hpRegen,
        3: Constants.T.basic_attack_hit_stack,
        4: Constants.T.skill_hit_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/IncreaseDefenceRatio", values: Constants.T.defense},
            {labelIntlID: "StatType/HpRegen", values: Constants.T.hpRegen},
        ]  
    })
}
