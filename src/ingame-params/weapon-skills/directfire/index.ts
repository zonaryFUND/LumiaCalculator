import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";

export default defineWeaponSkill({
    id: "DirectFire",
    damageTable,
    code: tooltip.code,
    tooltip: tooltip.info
})