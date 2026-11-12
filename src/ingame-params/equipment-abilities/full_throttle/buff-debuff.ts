import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 攻撃速度・スキル増幅のスタックはそれぞれ独立に選択する。移動速度増加は本来「両方のスタックが最大」のとき
// 自動で発生するが、バフ同士の連動は表現できないため独立したON/OFFとして選択させる
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.full-throttle-attack-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6090000",
        maxStack: Constants.attack_speed.max_stack,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6090000",
                value: {
                    type: "constant",
                    value: Constants.attack_speed.effect * stack
                }
            }]
        })
    },
    "item-skill.full-throttle-amp": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6090010",
        maxStack: Constants.amp.max_stack,
        buff: stack => ({
            skillAmp: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6090010",
                value: {
                    type: "constant",
                    value: Constants.amp.effect * stack
                }
            }]
        })
    },
    "item-skill.full-throttle-movement-speed": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6090020",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6090020",
                value: {
                    type: "constant",
                    value: Constants.ms * stack
                }
            }]
        })
    }
})
