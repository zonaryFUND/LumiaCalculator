import Decimal from "decimal.js";
import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";
import { createComponentValue } from "core/subject-dynamic/status/value-component/component";

// 移動速度増加はレベル比例値のみ（固定値なし）。装備由来のレベル比例値と同じ規約（Lv1から加算、oneBased: false）
// でcreateComponentValueを使って組み立て、その結果のvalueだけをstackで0/1切り替えする
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ config }) => ({
    "item-skill.charge-carrier": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.charge-carrier",
        maxStack: 1,
        buff: stack => {
            const value = createComponentValue(config.level, false, { levelProportional: Constants.movement_speed.level })!;

            return {
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6015010",
                    value: {
                        ...value,
                        value: new Decimal(value.value ?? 0).mul(stack)
                    }
                }]
            };
        }
    }
})
