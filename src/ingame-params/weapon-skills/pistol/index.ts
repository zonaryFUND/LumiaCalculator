import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";
import { buffDebuff } from "./buff-debuff";

export default defineWeaponSkill({
    id: "Pistol",
    damageTable,
    buffDebuff,
    code: tooltip.code,
    tooltip: tooltip.info
})