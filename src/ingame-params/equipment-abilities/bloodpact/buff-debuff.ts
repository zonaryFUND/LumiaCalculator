import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";

// 着用者の体力が閾値以下の状態でダメージを受けると、(1)シールド+妨害耐性、(2)適合型能力値増加+受ける回復量増加、
// の2つが同時にトリガーされる（シールドはdamage-table/table-values.ts側で別途表現）。継続時間が異なる
// （妨害耐性2.5秒、適合型能力値・回復増加8秒）ため別のバフとして分ける
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.bloodpact-guard": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.bloodpact-guard",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6016010",
                value: {
                    type: "constant",
                    value: Constants.tenacity * stack
                }
            }]
        })
    },
    "item-skill.bloodpact-adaptive": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.bloodpact-adaptive",
        maxStack: 1,
        buff: stack => ({
            // adaptiveForceはcalculation.tsのresolveAdaptiveForceBuffがattackPower/skillAmpへ変換する際、
            // skillAmp対象の場合は自動的に2倍にするため、ここではtooltip.ts同様の基準値をそのまま渡す
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6016010",
                value: {
                    type: "constant",
                    value: Constants.adaptive * stack
                }
            }],
            hpHealedIncreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/6016010",
                value: {
                    type: "constant",
                    value: Constants.heal * stack
                }
            }]
        })
    }
})
