import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 人間魚雷(T) 水上での自己移動速度・攻撃速度増加
    "subject.leon.t-buff": {
        origin: "skill",
        nameIntlID: "subject.leon.t-buff",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1029110",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1029110",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});
