import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 猛攻撃(E) 効果中の自己攻撃速度増加
    "subject.kenneth.e-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.kenneth.e-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1071400",
                value: {
                    type: "constant",
                    value: Constants.E.attack_speed[config.skillLevels.E] * stack
                }
            }]
        })
    }
});
