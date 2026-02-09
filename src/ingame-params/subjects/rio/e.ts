import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1031400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.max_target,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.hankyu_damage.base,
                2: RatioPercent(Constants.E.hankyu_damage.attack),
                4: Constants.E.daikyu_damage.base,
                5: RatioPercent(Constants.E.daikyu_damage.attack),
                6: Constants.E.daikyu_range,
                7: Constants.E.daikyu_range_damage.base,
                8: RatioPercent(Constants.E.daikyu_range_damage.attack),
                12: 3
            }
        } else {
            return {
                ...base,
                1: Constants.E.hankyu_damage,
                3: Constants.E.daikyu_damage,
                4: Constants.E.daikyu_range,
                5: Constants.E.daikyu_range_damage,
                6: 3
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/ShortBowDamage", values: Constants.E.hankyu_damage.base },
            { labelIntlID: "ToolTipType/YumiFirstDamage", values: Constants.E.daikyu_damage.base },
            { labelIntlID: "ToolTipType/YumiSecondDamage", values: Constants.E.daikyu_range_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
