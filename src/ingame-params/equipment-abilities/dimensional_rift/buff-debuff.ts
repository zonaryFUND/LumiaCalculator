import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff } from "../type";

// R(究極技)でダメージを与えた対象に付与される[次元不安定]デバフ。被ダメージ増加は対戦モードでの反映を予定
export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.dimensional-rift": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6072000",
        maxStack: 1,
        buff: stack => ({
            increaseDamagedRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6072000",
                value: {
                    type: "constant",
                    value: Constants.damage_increase * stack
                }
            }]
        })
    }
})
