import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { buffDebuff } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6017026,
    damageTable,
    buffDebuff,
    tooltipValues
})