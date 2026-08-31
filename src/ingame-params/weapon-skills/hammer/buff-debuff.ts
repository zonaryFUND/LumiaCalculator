import Constants from "./constants";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "weapon-skill.hammer.defense-down": {
        origin: "skill",
        nameIntlID: "weapon-skill.hammer.defense-down",
        maxStack: 3,
        stackLabels: [
            "buff-debuff.common.skill-level.1",
            "buff-debuff.common.skill-level.2",
            "buff-debuff.common.skill-level.3"
        ],
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/3013000",
                value: {
                    type: "constant",
                    value: Constants.defense_decline.effect[stack] * -1
                }
            }]
        })
    }
}