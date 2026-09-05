import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import damageTable from "./table-values";
import { buffDebuff, slowSources } from "./buff-debuff";

export default defineEquipmentAbility({
    code: [6007001, 6007002, 6007003],
    damageTable,
    buffDebuff,
    slowSources,
    tooltipValues
})