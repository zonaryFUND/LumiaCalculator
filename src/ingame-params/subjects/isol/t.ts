import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1009100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: Constants.T.duration,
        1: Constants.T.attack,
        2: Constants.T.amp
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackPowerRatio", values: Constants.T.attack},
            {labelIntlID: "StatType/InfluencePoint", values: Constants.T.amp}
        ]  
    })
}
