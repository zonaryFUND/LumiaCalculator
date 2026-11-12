import Constants from "./constants.json";
import { EquipmentAbilitySelfBuffDebuff } from "../type";
import { CommonPercentLabels } from "@app/ingame-params/buff-debuff/util";

// 敵実験体との距離に比例して増加する基本攻撃ダメージ（最大max_amp%）を、1%刻み（stack=増加量%）で選択させる。
// 基本攻撃ダメージの最終補正（basicAttackDamageFinalCorrectionRatio、ultra_focusと同じ枠）に反映する
export const buffDebuff: EquipmentAbilitySelfBuffDebuff = () => ({
    "item-skill.keep-your-distance": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.keep-your-distance",
        maxStack: Constants.max_amp,
        stackLabels: CommonPercentLabels(Constants.max_amp, 1),
        buff: stack => ({
            basicAttackDamageFinalCorrectionRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "item-skill.keep-your-distance",
                value: {
                    type: "constant",
                    value: stack
                }
            }]
        })
    }
})
