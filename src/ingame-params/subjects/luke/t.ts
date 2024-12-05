import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1022100;

export const info: SkillTooltipProps = {
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
        9: Constants.T.attack_speed.duration,
        10: RatioPercent(Constants.T.attack_speed.effect),
        11: Constants.T.attack_speed.max_stack
    }),
    expansion: () => ({
        tipValues: {
            0: Constants.T.chicken_bat,
            1: Constants.T.boar_hound_wolf,
            2: Constants.T.bear,
            3: Constants.T.subject,
            4: Constants.T.alpha_omega,
            5: Constants.T.wickline,
            6: Constants.T.food_box,
            7: Constants.T.epic_box,
            8: Constants.T.legendary_box
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.T.attack_speed.effect, percent: true},
            {labelIntlID: "ToolTipType/HpRegenRatioPlayer", values: Constants.T.subject_kill, percent: true},
            {labelIntlID: "ToolTipType/HpRegenRatioWickline", values: Constants.T.wickline_kill, percent: true}
        ]  
    })
}
