import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 「与えるスキルダメージ増加」効果はskillAmpとは別のStatusフィールド。ダメージ計算への反映は未実装
// （docs/known-issues.md参照）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.taser-gun": {
        origin: "equipment-ability",
        nameIntlID: "CharacterState/Group/Name/6040000",
        maxStack: 1,
        buff: stack => ({
            increaseSkillDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6040000",
                value: {
                    type: "constant",
                    value: Constants.skill_damage_enhance.effect * stack
                }
            }]
        })
    }
})
