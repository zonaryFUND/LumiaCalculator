import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonStackLabels } from "@app/ingame-params/buff-debuff/util";

// 移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する。
// 装備ごとに数値が異なる（20%/25%/30%の3種類を確認済み。近接武器は常に付与、防具は着用実験体が
// 近接のときのみ発生するが、この計算機は発生源側からは着用者の近接/遠隔を判定できないため参照値のみ）
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/6007000", values: [20, 25, 30] }
];

// 最大100スタックだが1スタック単位では管理せず、25刻み（0/25/50/75/100）の5段階から選択する。
// 最大移動速度（固定値）は装備ごとにimportedValues.msから注入され、選択したスタック数（25刻み）に
// 比例した分だけ獲得する
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.swift-strides": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6007000",
        maxStack: 4,
        stackLabels: CommonStackLabels(100, 25),
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6007000",
                value: {
                    type: "constant",
                    value: (importedValues?.ms ?? 0) * (stack * 25) / Constants.max_stack
                }
            }]
        })
    }
})
