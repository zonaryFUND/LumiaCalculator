import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";
import { givenBuffDebuff } from "./buff-debuff";

export default defineWeaponSkill({
    id: "Hammer",
    damageTable,
    givenBuffDebuff,
    code: tooltip.code,
    tooltip: tooltip.info
})