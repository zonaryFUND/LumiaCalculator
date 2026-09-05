import { EquipmentAbilitySelfBuffDebuff } from "../type";

// スタックごとの攻撃速度上昇量・最大スタック数・最大スタック時の攻撃力/移動速度上昇量は、いずれも装備ごとに
// 異なるためimportedValuesから注入される。移動速度上昇（importedValues.max.ms）は装備によっては存在しない
// （pulverization・swift_stridesに続き3例目のmoveSpeed固定値=sumバフ。%表記ではない）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.vigor": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6017000",
        maxStack: importedValues?.stack ?? 4,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/6017000",
                value: {
                    type: "constant",
                    value: (importedValues?.as ?? 0) * stack
                }
            }],
            ...(stack != (importedValues?.stack ?? 4) ? {} : {
                attackPower: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6017010",
                    value: {
                        type: "constant",
                        value: importedValues?.max?.ad ?? 0
                    }
                }],
                ...(importedValues?.max?.ms == undefined ? {} : {
                    moveSpeed: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/6017010",
                        value: {
                            type: "constant",
                            value: importedValues.max.ms
                        }
                    }]
                })
            })
        })
    }
})
