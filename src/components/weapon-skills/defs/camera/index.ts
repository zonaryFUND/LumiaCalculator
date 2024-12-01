import { defineWeaponSkill } from "components/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";

export default defineWeaponSkill({
    id: "Camera",
    damageTable,
    code: tooltip.code,
    tooltip: tooltip.info
})