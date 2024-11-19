import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";

export const code = 1025100;

export function BerniceCriticalDamage(status: Status): Decimal {
    return new Decimal(Constants.T.second_damage_multiplier).addPercent(status.criticalDamage.calculatedValue)
}

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, status }) => {
        const criticalDamage = BerniceCriticalDamage(status).toString();
        return {
            0: Constants.T.bullet[skillLevel],
            1: Constants.T.base_damage,
            2: showEquation ? `${Constants.T.base_damage.attack}%` : Constants.T.additional_damage,
            3: showEquation ? `${Constants.T.additional_damage.attack}%` : Constants.T.reload[skillLevel],
            4: showEquation ? Constants.T.reload[skillLevel] : `${criticalDamage}%`,
            5: `${criticalDamage}%`
        };
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShotGunBullet", values: Constants.T.bullet},
            {labelIntlID: "ToolTipType/ReloadTime", values: Constants.T.reload},
        ]  
    })
}
