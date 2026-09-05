import Decimal from "decimal.js";
import Constants from "./constants.json";
import { EquipmentAbilityPerpetualStatus } from "../type";

// 失った体力に比例して攻撃力割合が増加する常時判定型の効果（体力100%で0%、体力max_hp%以下で
// max_effect%に飽和、その間は比例）。ユーザーが着脱を選ぶ自己バフ（buffDebuff）ではなく、現在体力割合から
// 自動算出されるperpetualStatusとして実装する（sissela/perpetual-status.tsと同様のパターン）
const f: EquipmentAbilityPerpetualStatus = (config, currentHPRatio) => {
    const lostHPRatio = new Decimal(100).sub(currentHPRatio);
    const effect = Decimal.min(
        lostHPRatio.div(100 - Constants.max_hp).mul(Constants.max_effect),
        Constants.max_effect
    );

    if (effect.isZero()) return {};

    return {
        attackPower: [{
            origin: "perpetual_status",
            calculationType: "mul",
            intlID: "item-skill.rebellion",
            value: {
                type: "constant",
                value: effect
            }
        }]
    };
};

export default f;
