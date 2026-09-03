import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 死神の目(T) 付与時の自己移動速度増加
    "subject.zahir.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.zahir.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1005100",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});
