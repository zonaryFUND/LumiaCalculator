import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1036100;

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.T.cooldown,
    values: ({ }) => ({
        0: Constants.T.damage.base,
        2: Constants.T.cooldown.constant,
        6: 6,
        7: Constants.T.vitalforce_enhanced_attack,
        8: 1,
        9: Constants.T.vitalforce,
        10: Constants.T.vitalforce_kill,
        11: Constants.T.vitalforce_assist,
        12: RatioPercent(Constants.T.damage.amp),
        13: Constants.T.basic_attack_range,
        20: Constants.T.damage
    }), 
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base}
        ]  
    })
}
