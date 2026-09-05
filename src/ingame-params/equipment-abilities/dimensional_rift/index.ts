import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { givenBuffDebuff } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6072001,
    damageTable,
    givenBuffDebuff,
    tooltipValues
})