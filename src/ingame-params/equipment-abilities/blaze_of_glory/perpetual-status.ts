import Constants from "./constants.json";
import { EquipmentAbilityPerpetualStatus } from "../type";

// 現在体力が閾値(hp_threshold)%以上の間だけ[光輝]状態として「与えるスキルダメージ増加」が発生する、
// 常時判定型の効果。ユーザーが着脱を選ぶ自己バフ（buffDebuff）ではなく、現在体力割合から自動算出される
// perpetualStatusとして実装する（sissela/perpetual-status.tsと同様のパターン）。
// increaseSkillDamageRatioはインタフェースのみでダメージ計算への反映は未実装（docs/known-issues.md参照）
const f: EquipmentAbilityPerpetualStatus = (config, currentHPRatio) => {
    if (currentHPRatio < Constants.hp_threshold) return {};

    return {
        increaseSkillDamageRatio: [{
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "CharacterState/Group/Name/6061000",
            value: {
                type: "constant",
                value: Constants.damage_amp
            }
        }]
    };
};

export default f;
