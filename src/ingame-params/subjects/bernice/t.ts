import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1025100;

export function BerniceCriticalDamage(status: Status): Decimal {
    return new Decimal(Constants.T.second_damage_multiplier).addPercent(status.criticalStrikeDamage.calculatedValue)
}

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation, status }) => {
        const criticalDamage = BerniceCriticalDamage(status).toString();
        return {
            0: Constants.T.bullet,
            1: Constants.T.base_damage,
            2: showEquation ? RatioPercent(Constants.T.base_damage.attack) : Constants.T.additional_damage,
            3: showEquation ? RatioPercent(Constants.T.additional_damage.attack) : Constants.T.reload,
            4: showEquation ? Constants.T.reload : RatioPercent(criticalDamage),
            5: RatioPercent(criticalDamage)
        };
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShotGunBullet", values: Constants.T.bullet},
            {labelIntlID: "ToolTipType/ReloadTime", values: Constants.T.reload},
        ]  
    })
}
