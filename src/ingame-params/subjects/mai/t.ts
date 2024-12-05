import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.damage.defense),
        2: Constants.T.level[0],
        3: Constants.T.level[1],
        4: Constants.T.level[2],
        5: Constants.T.level[3]
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DefenceIncreaseDamage", values: Constants.T.damage.defense, percent: true}
        ]  
    })
}
