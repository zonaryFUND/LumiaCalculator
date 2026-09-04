import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.awakening": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.awakening",
        maxStack: 1,
        buff: stack => ({
            ...(importedValues?.attackSpeed != undefined ? {
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6048000",
                    value: {
                        type: "constant",
                        value: importedValues.attackSpeed * stack
                    }
                }]
            } : {}),
            ...(importedValues?.moveSpeed != undefined ? {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6048000",
                    value: {
                        type: "constant",
                        value: importedValues.moveSpeed * stack
                    }
                }]
            } : {}),
            ...(importedValues?.penetrationDefenseRatio != undefined ? {
                penetrationDefenseRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6048010",
                    value: {
                        type: "constant",
                        value: importedValues.penetrationDefenseRatio * stack
                    }
                }]
            } : {})
        })
    }
})
