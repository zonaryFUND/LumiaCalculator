import { SubjectIncomingBuffDebuffCatalog } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityIncomingBuffDebuffCatalog } from "@app/ingame-params/equipment-abilities/dictionary";
import { WeaponSkillIncomingBuffDebuffCatalog } from "@app/ingame-params/weapon-skills/dictionary";
import { BuffDebuffDefinition } from "./type";

/**
 * 他者（敵）から受けるバフ・デバフの全カタログ。実験体スキル由来（`SubjectIncomingBuffDebuffCatalog`）、
 * 武器スキル由来（`WeaponSkillIncomingBuffDebuffCatalog`）、装備アビリティ由来
 * （`EquipmentAbilityIncomingBuffDebuffCatalog`）を発生源を問わず1つに集約したもので、
 * `statusOf()`でのstate解決・`incoming-buffs.tsx`の追加UIの一覧表示の両方から共通で参照する
 */
export const IncomingBuffDebuffCatalog: Record<string, BuffDebuffDefinition> = {
    ...SubjectIncomingBuffDebuffCatalog,
    ...WeaponSkillIncomingBuffDebuffCatalog,
    ...EquipmentAbilityIncomingBuffDebuffCatalog
};
