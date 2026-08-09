import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import * as tooltip from "./tooltip";
import damageTable from "./damage-table";

export default defineWeaponSkill({
    id: "HighAngleFire",
    code: tooltip.code,
    tooltip: tooltip.info,
    damageTable: damageTable
})