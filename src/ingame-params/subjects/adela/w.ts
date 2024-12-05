import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1024300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        2: Constants.W.pawn_queen.airborne,
        3: Constants.W.rook.airborne,
        4: Constants.W.duration,
        5: RatioPercent(Constants.W.pawn_queen.damage),
        6: RatioPercent(Constants.W.damage.amp),
        20: Constants.W.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
