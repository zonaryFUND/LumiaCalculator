import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const LocalID = "item-skill.blaze-up-amplified";

// 1スタックごとに「与えるスキルダメージ増加」(Constants.skill_damage%、increaseSkillDamageRatioは
// skillAmpとは別のStatusフィールド。ダメージ計算への反映は未実装。docs/known-issues.md参照)、
// 最大スタック時のみ追加効果（アイテムにより、ダメージ吸血または移動速度のいずれか。importedValuesから注入）
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    [LocalID]: {
        origin: "equipment-ability",
        nameIntlID: LocalID,
        maxStack: Constants.max_stack,
        buff: stack => ({
            increaseSkillDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6053000",
                value: {
                    type: "constant",
                    value: Constants.skill_damage * stack
                }
            }],
            ...(stack != Constants.max_stack ? {} :
                importedValues?.lifeSteal != undefined ? {
                    lifeSteal: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/6053010",
                        value: {
                            type: "constant",
                            value: importedValues.lifeSteal
                        }
                    }]
                } :
                importedValues?.moveSpeed != undefined ? {
                    moveSpeed: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/6053020",
                        value: {
                            type: "constant",
                            value: importedValues.moveSpeed
                        }
                    }]
                } : {}
            )
        })
    }
})
