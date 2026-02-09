import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    charge: Constants.W.charge,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        2: Constants.W.duration,
        3: RatioPercent(Constants.W.damage_decline),
        4: RatioPercent(Constants.W.movement_speed),
        5: Constants.W.charge.max,
        7: Constants.W.charge_time_reduction,
        11: RatioPercent(Constants.W.damage.amp),
        12: RatioPercent(Constants.W.damage.additionalMaxHP),
        20: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.movement_speed, percent: true },
            { labelIntlID: "ToolTipType/DecreaseReceiveDamageRatio", values: Constants.W.damage_decline, percent: true },
            { labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time }
        ]
    })
}
