import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 二連発(Q) 攻撃速度増加
    "subject.aya.q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.aya.q-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1002200",
                value: {
                    type: "constant",
                    value: Constants.Q.attack_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    }
});
