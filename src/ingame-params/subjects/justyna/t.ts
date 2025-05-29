import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1079100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.mark_damage.base,
                1: RatioPercent(Constants.T.mark_damage.amp),
                2: RatioPercent(Constants.T.target_damage),
                3: RatioPercent(Constants.T.splash_damage),
                4: Constants.T.energy_syphon,
                5: Constants.T.max_energy,
                6: Constants.T.energy_regain.tick,
                7: Constants.T.energy_regain.amount,
                8: Constants.T.recharge_threshold,
                9: Constants.T.recharge_duration
            }
        } else {
            return {
                0: Constants.T.mark_damage,
                1: RatioPercent(Constants.T.target_damage),
                2: RatioPercent(Constants.T.splash_damage),
                3: Constants.T.energy_syphon,
                4: Constants.T.max_energy,
                5: Constants.T.energy_regain.tick,
                6: Constants.T.energy_regain.amount,
                7: Constants.T.recharge_threshold,
                8: Constants.T.recharge_duration
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.animal_energy_syphon_ratio)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.mark_damage.base},
            {labelIntlID: "ToolTipType/JustynaEnergy", values: Constants.T.max_energy}
        ]  
    })
}
