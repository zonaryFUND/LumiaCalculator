import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1018100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.knife_range,
            1: Constants.T.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.T.basic_attack_damage.base,
                3: Constants.T.knife_damage.base,
                5: Constants.T.duration,
                7: RatioPercent(Constants.T.knife_damage.amp),
                8: RatioPercent(Constants.T.basic_attack_damage.amp),
                9: RatioPercent(Constants.T.basic_attack_damage.targetMaxHP)
            }
        } else {   
            return {
                ...base,
                2: Constants.T.basic_attack_damage,
                3: Constants.T.knife_damage,
                4: Constants.T.duration,
                5: RatioPercent(Constants.T.basic_attack_damage.targetMaxHP)
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.basic_attack_damage.base},
            {labelIntlID: "ToolTipType/MaxHpCoef", values: Constants.T.basic_attack_damage.targetMaxHP},
            {labelIntlID: "ToolTipType/DaggerDamage", values: Constants.T.knife_damage.base}
        ]  
    })
}
