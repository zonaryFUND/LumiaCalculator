import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const buffDebuff: SubjectSelfBuffDebuff = config => ({
    "subject.magnus.passive-defense": {
        origin: "skill",
        nameIntlID: "CharacterState/Group/Name/1004100",
        maxStack: Constants.T.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1004100",
                value: {
                    type: "constant",
                    value: Constants.T.defense[config.skillLevels.T] * stack
                }
            }],
            ...(stack == Constants.T.max_stack ? {
                hpRegen: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1004110",
                    value: {
                        type: "constant",
                        value: Constants.T.hpRegen[config.skillLevels.T]
                    }
                }]
            } : {})
        })
    }
})
