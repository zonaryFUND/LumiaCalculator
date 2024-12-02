import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1040300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.damage.base,
        2: RatioPercent(Constants.W.slow),
        3: Constants.W.drop_damage.base,
        4: RatioPercent(Constants.W.drop_damage.attack),
        5: Constants.W.drop_slow.duration,
        6: Constants.W.nina_damage.base,
        7: RatioPercent(Constants.W.nina_damage.ninaAttack),
        8: Constants.W.movement_speed.duration,
        9: RatioPercent(Constants.W.movement_speed.effect),
        10: Constants.W.airborne,
        12: RatioPercent(Constants.W.damage.attack),
        16: showEquation ? RatioPercent(Constants.W.drop_slow.effect) : Constants.W.damage,
        17: Constants.W.drop_damage,
        18: Constants.W.nina_damage,
        19: RatioPercent(Constants.W.drop_slow.effect)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageSewing", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DamageSewingDeco", values: Constants.W.drop_damage.base},
            {labelIntlID: "ToolTipType/DamageSewingSlow", values: Constants.W.drop_slow.effect, percent: true},
            {labelIntlID: "ToolTipType/DamageNinaKick", values: Constants.W.nina_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
