import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 常に「安定」「内面の怒り」のいずれかの状態にあり、「どちらでもない」状態は存在しないため
// excludeNoneOptionを指定する。「内面の怒り」への切り替わりは体力50%以下時の被弾がトリガーだが、
// 一定時間経過で「安定」に戻る（体力状態から一意に導出できない）ため、HPは参照せず単純な択一バフとして定義する
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.two-sides": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.two-sides",
        maxStack: 2,
        stackLabels: ["buff-debuff.common.none", "CharacterState/Group/Name/6067000", "CharacterState/Group/Name/6067010"],
        excludeNoneOption: true,
        buff: stack => {
            if (stack == 2) {
                return {
                    attackPower: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/6067010",
                        value: {
                            type: "constant",
                            value: Constants.attack
                        }
                    }],
                    lifeSteal: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/6067010",
                        value: {
                            type: "constant",
                            value: Constants.omnisyphon
                        }
                    }]
                };
            }
            return {
                defense: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6067000",
                    value: {
                        type: "constant",
                        value: Constants.defense
                    }
                }]
            };
        }
    }
});
