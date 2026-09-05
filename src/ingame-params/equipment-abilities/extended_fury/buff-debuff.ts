import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.extended-fury": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.extended-fury",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6034000",
                value: {
                    type: "constant",
                    value: (importedValues?.extend ?? 0) * stack
                }
            }]
        })
    }
})
