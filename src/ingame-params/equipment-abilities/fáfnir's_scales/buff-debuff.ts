import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 防御力の固定値スタックバフ（origin: "temporary-status"のsum成分は、combine-components.tsの
// calculateDefenseValueが乗算の後に加算する形で正しく扱う。docs/status-model.mdのdefense項目参照）。
// シールドはdamage-table/table-values.ts側で別途表現する
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.fafnirs-scales": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.fafnirs-scales",
        maxStack: Constants.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6063000",
                value: {
                    type: "constant",
                    value: Constants.defense_per_stack * stack
                }
            }],
            ...(stack == Constants.max_stack ? {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6063010",
                    value: {
                        type: "constant",
                        value: Constants.movement_speed
                    }
                }]
            } : {})
        })
    }
})
