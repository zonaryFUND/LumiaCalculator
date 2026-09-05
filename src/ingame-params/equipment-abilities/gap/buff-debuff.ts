import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";
import { weaponRangeOf } from "core/subject-dynamic/config";

// 実際の効果はダメージ発生源との距離に比例するが、この計算機は実験体間の距離を扱わないため、
// 距離が最大（効果量最大）の場合を仮定した被ダメージ減少を自己バフ（ON/OFF）として定義する。
// 最大減少量は近接/遠隔武器で異なる。l10nに専用のCharacterState表記が見当たらないため、
// nameIntlID・intlIDともにitem-skills.jsonで独自定義した名前を使う
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ config }) => {
    const maxReduction = weaponRangeOf(config) == "melee" ? Constants.melee : Constants.range;

    return {
        "item-skill.gap": {
            origin: "equipment-ability",
            nameIntlID: "item-skill.gap",
            maxStack: 1,
            buff: stack => ({
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "item-skill.gap",
                    value: {
                        type: "constant",
                        value: maxReduction * stack
                    }
                }]
            })
        }
    };
};
