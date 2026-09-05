import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { slowSources } from "./buff-debuff";

export default defineEquipmentAbility({
    code: [6013003, 6013004, 6013006],
    damageTable,
    slowSources,
    tooltipValues
})