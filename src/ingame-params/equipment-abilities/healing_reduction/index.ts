import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";

// 与えるデバフ（受ける治癒効果減少）は、多数の装備アイテムがこのアビリティを共有しており効果量も常に同一
// なため、装備ごとの個別エントリにはせず汎用デバフ1本にまとめる
// （ingame-params/buff-debuff/generic-healing-reduction.ts参照。移動速度減少と同じ方針）
export default defineEquipmentAbility({
    code: 6008201,
    tooltipValues
})
