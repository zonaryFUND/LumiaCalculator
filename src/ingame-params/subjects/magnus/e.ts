import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1004400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const common = {
            0: Constants.E.damage.base,
            1: RatioPercent(Constants.E.damage.targetMaxHP),
            2: Constants.E.knockback,
            3: Constants.E.stun,
            4: RatioPercent(Constants.E.damage.amp),
            5: RatioPercent(Constants.E.damage.additionalAttack),
            6: Constants.E.wall_damage.base,
            7: RatioPercent(Constants.E.wall_damage.targetMaxHP),
            8: RatioPercent(Constants.E.wall_damage.amp),
            9: RatioPercent(Constants.E.wall_damage.additionalAttack),
            20: Constants.E.damage,
            21: Constants.E.wall_damage
        }

        if (showEquation) {
            return {
                ...common,
                4: RatioPercent(Constants.E.damage.amp)
            }
        } else {
            return {
                ...common,
                4: RatioPercent(Constants.E.wall_damage.targetMaxHP)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/StunTime", values: Constants.E.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
