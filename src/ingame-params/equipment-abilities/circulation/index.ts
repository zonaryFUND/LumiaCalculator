import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { buffDebuff } from "./buff-debuff";

// 実アイテム（203506・203413）のskillCodeは6017006だが、Body/Descのローカライズテキストは6017006側に
// 存在せず6017005側にのみ定義されている（skill.tsxのsanitizedCode参照。"Vigor-Circulation does not
// provide same code between name and description"）。tooltipValuesの解決はskill.tsxが明示的に
// sanitizedCode(6017005)で行うのに対し、damageTable・buffDebuffの解決（use-item-skills.ts・
// self-buff-definitions.ts）は生のability.skillCode(6017006)で行うため、両方のcodeに登録しないと
// どちらか一方が実アイテムに対して機能しない。実際、このためdamageTable（追加ダメージ表示）はこれまで
// 実アイテム装備時に一切表示されていなかった（今回のバフ・デバフ実装時に発見・修正）
export default defineEquipmentAbility({
    code: [6017005, 6017006],
    damageTable,
    tooltipValues,
    buffDebuff
})