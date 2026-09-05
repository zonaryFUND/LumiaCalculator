import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 実際の効果量は「野生動物処置で得たクレジット（Constants.credits_for_1_attack単位で攻撃力+1）」に
// 依存するが、この計算機は野生動物処置量を扱わないため、stackを「獲得済みの攻撃力増加量そのもの」として
// 直接選択できるようにする（現実的に1〜20程度の範囲で足りる）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.gold-pouch": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.gold-pouch",
        maxStack: 20,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6082010",
                value: {
                    type: "constant",
                    value: Constants.attack_per_credit_unit * stack
                }
            }]
        })
    }
})
