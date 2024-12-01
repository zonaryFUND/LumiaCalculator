import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1013100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ status }) => ({
        0: RatioPercent(Constants.T.food),
        1: status.maxHP.overrideAdditional?.value?.toString() ?? "",
        6: Constants.T.max_hp,
        11: Constants.T.max_stack
    }),
    expansion: () => ({
        tipValues: {
            2: Constants.T.stack_gain.uncommon,
            3: Constants.T.stack_gain.rare,
            4: Constants.T.stack_gain.epic,
            5: Constants.T.stack_gain.legendary
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxHpUp", values: Constants.T.max_hp}
        ]  
    })
}
