import { EquipmentAbilitySelfBuffDebuff } from "../type";

// ゲーム内表記は「情熱 - 循環」（実アイテムのskillCodeは6017006だが、Body/Desc用のツールチップindex用idは
// vigorと同じ6017005を流用しているため、l10n側にこのアビリティ専用のCharacterState表記が見当たらない。
// バフ名はitem-skills.jsonに独自定義する。circulation/tooltip.tsのコメント・
// equipment-abilities/CHECKLIST.mdの注記参照）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    "item-skill.circulation": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.circulation",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "item-skill.circulation",
                value: {
                    type: "constant",
                    value: (importedValues?.as ?? 0) * stack
                }
            }]
        })
    }
})
