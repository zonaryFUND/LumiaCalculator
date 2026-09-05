import Constants from "./constants";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "weapon-skill.hammer.defense-down": {
        origin: "skill",
        nameIntlID: "weapon-skill.hammer.defense-down",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/3013000",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.defense_decline.effect[stack - 1] * -1
                }
            }]
        })
    }
}