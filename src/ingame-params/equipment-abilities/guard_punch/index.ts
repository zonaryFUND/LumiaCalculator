import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { slowSources } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6069001,
    damageTable,
    slowSources,
    tooltipValues
})