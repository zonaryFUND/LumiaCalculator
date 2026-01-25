import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.shield.base,
        1: RatioPercent(Constants.E.shield.maxHP),
        2: Constants.E.shield_duration,
        6: Constants.E.damage.base,
        8: Constants.E.taunt,
        9: Constants.E.reuse,
        10: RatioPercent(Constants.E.shield.amp),
        11: RatioPercent(Constants.E.damage.amp),
        12: RatioPercent(Constants.E.shield.amp),
        13: RatioPercent(Constants.E.damage.additionalMaxHP),
        20: Constants.E.shield,
        21: Constants.E.damage,
        22: Constants.E.shield,
        23: RatioPercent(Constants.E.attack_speed.effect),
        24: Constants.E.attack_speed.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.E.shield.base},
            {labelIntlID: "ToolTipType/TauntTime", values: Constants.E.taunt},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
