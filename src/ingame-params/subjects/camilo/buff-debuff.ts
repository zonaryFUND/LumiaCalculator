import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // ブエルタ(Q) スタック獲得時の自己移動速度増加
    "subject.camilo.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.camilo.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1039250",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // ドゥエンデ(R) 踊っている間の被ダメージ減少
    "subject.camilo.r-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.camilo.r-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1039500",
                value: {
                    type: "constant",
                    value: Constants.R.damage_reduction[config.skillLevels.R] * stack
                }
            }]
        })
    },
    // オーレ(T) 起動時の自己攻撃速度増加
    "subject.camilo.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.camilo.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1039130",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});
