import { defineEquipmentAbility } from "../type";
import damageTable from "./table-values";
import tooltipValues from "./tooltip";
import { buffDebuff } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6073101,
    damageTable,
    buffDebuff,
    tooltipValues
})