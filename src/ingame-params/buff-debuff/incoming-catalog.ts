import { SubjectIncomingBuffDebuffCatalog } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityIncomingBuffDebuffCatalog } from "@app/ingame-params/equipment-abilities/dictionary";
import { WeaponSkillIncomingBuffDebuffCatalog } from "@app/ingame-params/weapon-skills/dictionary";
import { TacticalSkillGivenBuffDebuff } from "@app/ingame-params/tactical-skill/buff-debuff";
import { BuffDebuffDefinition } from "./type";

/**
 * 他者（味方・敵）から受けるバフ・デバフの全カタログ。実験体スキル由来（`SubjectIncomingBuffDebuffCatalog`）、
 * 武器スキル由来（`WeaponSkillIncomingBuffDebuffCatalog`）、装備アビリティ由来
 * （`EquipmentAbilityIncomingBuffDebuffCatalog`）、戦術スキル由来（`TacticalSkillGivenBuffDebuff`）を
 * 発生源を問わず1つに集約したもので、`statusOf()`でのstate解決・`incoming-buffs.tsx`の追加UIの一覧表示の
 * 両方から共通で参照する。特性・オブジェクト討伐は「自身が選択して得る」効果であり他者に与えるものではない
 * ため、このカタログには含まれない（`selectable-self-buff-catalog.ts`側）
 */
export const IncomingBuffDebuffCatalog: Record<string, BuffDebuffDefinition> = {
    ...SubjectIncomingBuffDebuffCatalog,
    ...WeaponSkillIncomingBuffDebuffCatalog,
    ...EquipmentAbilityIncomingBuffDebuffCatalog,
    ...TacticalSkillGivenBuffDebuff
};
