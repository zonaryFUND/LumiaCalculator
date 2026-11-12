import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";

// 「基本攻撃的中時の効果を追加で1回発動」は計算に反映しない（ツールチップの説明のみ）
export default defineEquipmentAbility({
    code: 6093001,
    damageTable,
    tooltipValues
})