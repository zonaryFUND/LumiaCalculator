import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import damageTable from "./damage-table";
import * as tooltip from "./tooltip";
import { buffDebuff, slowSources } from "./buff-debuff";

export default defineWeaponSkill({
    id: "OneHandSword",
    damageTable,
    code: tooltip.code,
    tooltip: tooltip.info,
    buffDebuff,
    slowSources
})