import { EquipmentAbilityGivenBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する。
// 装備ごとに数値が異なる（25%・99%の2種類を確認済み）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/6019000", values: [25, 99] }
];

// 攻撃速度減少は装備によって数量が異なり、スロウのみを与える装備も存在する（importedValues.asが
// 存在しない場合は何も返さない）ため、個別デバフとしてこの部分だけをgivenBuffDebuffに登録する
export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = ({ importedValues }) => ({
    ...(importedValues?.as == undefined ? {} : {
        "item-skill.lichs-grasp-attack-speed": {
            origin: "equipment-ability",
            nameIntlID: "item-skill.lichs-grasp-attack-speed",
            maxStack: 1,
            buff: stack => ({
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "item-skill.lichs-grasp-attack-speed",
                    value: {
                        type: "constant",
                        value: -importedValues.as * stack
                    }
                }]
            })
        }
    })
});
