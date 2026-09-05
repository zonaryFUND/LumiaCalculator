import { EquipmentAbilitySelfBuffDebuff } from "../type";

// アイテムにより効果量・内容が異なる（201525は攻撃速度のみ、201701は適合型能力値+攻撃速度）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.combat-instinct": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.combat-instinct",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6055100",
                value: {
                    type: "constant",
                    value: (importedValues?.attack_speed ?? 0) * stack
                }
            }],
            ...(importedValues?.adaptive != undefined ? {
                adaptiveForce: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6055110",
                    value: {
                        type: "constant",
                        value: importedValues.adaptive * stack
                    }
                }]
            } : {})
        })
    }
})
