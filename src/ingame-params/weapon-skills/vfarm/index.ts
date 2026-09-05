import { defineWeaponSkill } from "@app/ingame-params/weapon-skills/type";
import * as tooltip from "./tooltip";
import { buffDebuff } from "./buff-debuff";

export default defineWeaponSkill({
    id: "VFArm",
    code: tooltip.code,
    tooltip: tooltip.info,
    buffDebuff
})