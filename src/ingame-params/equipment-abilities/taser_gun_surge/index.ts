import { defineEquipmentAbility } from "../type";
import damageTable from "./table-values"
import tooltipValues from "./tooltip";
import { givenBuffDebuff } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6051001,
    damageTable,
    givenBuffDebuff,
    tooltipValues
})