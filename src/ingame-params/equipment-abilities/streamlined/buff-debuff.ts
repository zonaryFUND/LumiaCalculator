import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.streamlined": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6015010",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6015010",
                value: {
                    type: "constant",
                    value: (importedValues?.ms ?? 0) * stack
                }
            }]
        })
    }
})
