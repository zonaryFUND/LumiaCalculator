import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

export const LocalID = "item-skill.blaze-up-amplified";

// 1スタックごとの「与えるスキルダメージ増加」(Constants.skill_damage%)は、skillAmpとは別種の効果であり
// この計算機がまだ計算に反映する仕組みを持たないため、ここには含めない（表示専用の宣言はindex.tsの
// givenSkillDamageIncreaseを参照。docs/known-issues.md参照）。ここで表現するのは最大スタック時のみ得られる
// 追加効果（アイテムにより、ダメージ吸血または移動速度のいずれか。importedValuesから注入される）のみ
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ importedValues }) => ({
    [LocalID]: {
        origin: "equipment-ability",
        nameIntlID: LocalID,
        maxStack: Constants.max_stack,
        buff: stack => (
            stack != Constants.max_stack ? {} :
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
    }
})
