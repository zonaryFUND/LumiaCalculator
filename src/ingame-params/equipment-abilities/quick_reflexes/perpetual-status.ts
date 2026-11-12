import Constants from "./constants.json";
import { EquipmentAbilityPerpetualStatus } from "../type";

// 現在体力が閾値(hp_threshold)%以上の間だけ移動速度が増加する常時判定型の効果（blaze_of_gloryと同じパターン）
const f: EquipmentAbilityPerpetualStatus = (config, currentHPRatio) => {
    if (currentHPRatio < Constants.hp_threshold) return {};

    return {
        moveSpeed: [{
            origin: "perpetual_status",
            calculationType: "mul",
            intlID: "CharacterState/Group/Name/6084000",
            value: {
                type: "constant",
                value: Constants.ms
            }
        }]
    };
};

export default f;