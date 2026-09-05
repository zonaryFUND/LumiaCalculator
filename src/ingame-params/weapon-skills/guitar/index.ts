import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";
import { slowSources } from "./buff-debuff";

export default defineWeaponSkill({
    id: "Guitar",
    damageTable,
    code: tooltip.code,
    tooltip: tooltip.info,
    slowSources
})