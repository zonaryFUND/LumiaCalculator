import { defineEquipmentAbility } from "../type";
import tooltipValues from "./tooltip";
import { buffDebuff, givenBuffDebuff } from "./buff-debuff";

export default defineEquipmentAbility({
    code: 6027101,
    buffDebuff,
    givenBuffDebuff,
    tooltipValues
})