import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import Constants from "./constants";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";


export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "subject.darko.w-attack-steal": {
        origin: "skill",
        nameIntlID: "subject.darko.w-attack-steal",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1074310",
                value: {
                    type: "constant",
                    value: Constants.W.attack.effect[stack - 1] * -1
                }
            }]
        })
    }
};