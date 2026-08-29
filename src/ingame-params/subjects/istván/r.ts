import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "core/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1080500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        return {
            0: Constants.R.slow.duration,
            1: RatioPercent(Constants.R.slow.effect),
            2: Constants.R.damage.base,
            3: RatioPercent(Constants.R.damage.attack),
            4: Constants.R.second_damage.base,
            5: RatioPercent(Constants.R.second_damage.attack),
            20: Constants.R.damage,
            21: Constants.R.second_damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base },
            { labelIntlID: "ToolTipType/IstvanCloneDamage", values: Constants.R.second_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
