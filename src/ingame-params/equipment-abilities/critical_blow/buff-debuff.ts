import Decimal from "decimal.js";
import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 「最大体力を超えた分の回復量は追加体力に変換」される効果を、maxHpへの自己バフ（ON/OFF）として近似する。
// 実際の変換量は発動時の現在体力（=失った体力）に依存し、buffDebuffはそれを受け取れないため、
// 理論上の最大値（失った体力が最大＝現在体力0のとき、つまりlostHP=maxHpのとき）で表現する
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = ({ status }) => ({
    "item-skill.critical-blow": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.critical-blow",
        maxStack: 1,
        buff: stack => {
            const maxAdditionalHp = new Decimal(Constants.heal.base)
                .add(status.attackPower.calculatedValue.mul(Constants.heal.attack).div(100))
                .add(status.maxHp.calculatedValue.mul(Constants.heal.lostHP).div(100));

            return {
                maxHp: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6046010",
                    value: {
                        type: "constant",
                        value: maxAdditionalHp.mul(stack)
                    }
                }]
            };
        }
    }
})
