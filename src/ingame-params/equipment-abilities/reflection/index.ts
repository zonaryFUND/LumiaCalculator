import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";

// このアビリティが与える治癒減少効果（Constants.healing_reduction.effect、常に20%固定）は、
// 「装備による治癒減少（英雄・伝説）」（ingame-params/buff-debuff/generic-healing-reduction.ts の
// generic.healing-reduction.epic-legend）と効果量が完全一致しているため、個別のgivenBuffDebuffは実装せず、
// 既存の汎用デバフに含まれているものとみなす。このアイテムの等級が将来Epic/Legend以外に変わった場合や、
// 20%という数値自体が調整された場合はこの前提が崩れるため要見直し
export default defineEquipmentAbility({
    code: 6006001,
    damageTable,
    tooltipValues
})