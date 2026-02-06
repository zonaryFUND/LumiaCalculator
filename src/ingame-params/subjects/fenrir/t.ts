import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1086100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        const base = {
            0: Constants.T.last_ditch.undying,
            1: Constants.T.last_ditch.uncontrollable,
            2: Constants.T.last_ditch.movement_speed_penalty.duration,
            3: RatioPercent(Constants.T.last_ditch.attack_speed),
            4: RatioPercent(Constants.T.last_ditch.movement_speed),
            5: RatioPercent(Constants.T.last_ditch.additional_damage.targetMaxHP),
            6: RatioPercent(Constants.T.last_ditch.movement_speed_penalty.effect),
            7: Constants.T.last_ditch.penalty_max_stack,
            8: Constants.T.vf_absorption.duration,
            9: Constants.T.vf_absorption.effect_period
        };
        
        if (showEquation) {
            return {
                ...base,
                10: RatioPercent(Constants.T.vf_absorption.damage.additionalAttack),
                11: RatioPercent(Constants.T.vf_absorption.heal.additionalAttack),
                20: Constants.T.vf_absorption.damage.base,
                21: Constants.T.vf_absorption.heal.base
            }
        } else {
            return {
                ...base,
                20: Constants.T.vf_absorption.damage,
                21: Constants.T.vf_absorption.heal
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.T.vf_absorption.heal.base},
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.vf_absorption.damage.base}
        ]  
    })
}
