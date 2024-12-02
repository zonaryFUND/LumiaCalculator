import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.subject_kill),
        2: RatioPercent(Constants.T.wickline_kill),
        3: Constants.T.evolution_stack[0],
        4: Constants.T.evolution_stack[1],
        5: Constants.T.evolution_stack[2],
        6: Constants.T.heal_amp_threshold,
        7: Constants.T.heal_amp_per,
        8: "1%",
        9: Constants.T.chicken_bat,
        10: Constants.T.bear,
        11: Constants.T.subject,
        12: Constants.T.wickline,
        14: Constants.T.food_box,
        15: Constants.T.epic_box,
        16: Constants.T.legendary_box,
        17: Constants.T.alpha_omega,
        18: Constants.T.boar_hound_wolf
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/HpRegenRatioPlayer", values: Constants.T.subject_kill, percent: true},
            {labelIntlID: "ToolTipType/HpRegenRatioWickline", values: Constants.T.wickline_kill, percent: true}
        ]  
    })
}
