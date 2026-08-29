import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1025100;

export function BerniceCriticalDamage(status: Status): Decimal {
    return new Decimal(Constants.T.second_damage_multiplier).addPercent(status.criticalStrikeDamage.calculatedValue)
}

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation, status }): TooltipValues => {
        const criticalDamage = BerniceCriticalDamage(status).toString();
        if (showEquation) {
            return {
                0: Constants.T.bullet,
                2: RatioPercent(Constants.T.base_damage.attack),
                3: RatioPercent(Constants.T.additional_damage.attack),
                4: Constants.T.reload,
                5: RatioPercent(criticalDamage),
                7: Constants.T.auto_charge,
                8: Constants.T.ammo
            }
        } else {
            return {
                0: Constants.T.bullet,
                1: Constants.T.base_damage,
                2: Constants.T.additional_damage,
                3: Constants.T.reload,
                4: RatioPercent(criticalDamage),
                6: Constants.T.auto_charge,
                7: Constants.T.ammo
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MaxBullet", values: Constants.T.ammo},
            {labelIntlID: "ToolTipType/ReloadTime", values: Constants.T.reload},
        ]  
    })
}
