import { SubjectIncomingBuffDebuffCatalog } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityIncomingBuffDebuffCatalog } from "@app/ingame-params/equipment-abilities/dictionary";
import { WeaponSkillIncomingBuffDebuffCatalog } from "@app/ingame-params/weapon-skills/dictionary";
import { AugmentGivenBuffDebuff } from "@app/ingame-params/augment/buff-debuff";
import { TacticalSkillGivenBuffDebuff } from "@app/ingame-params/tactical-skill/buff-debuff";
import { GenericSlowDebuff } from "./generic-slow";
import { GenericHealingReduction } from "./generic-healing-reduction";
import { BuffDebuffDefinition } from "./type";

/**
 * 他者（味方・敵）から受けるバフ・デバフの全カタログ。実験体スキル由来（`SubjectIncomingBuffDebuffCatalog`）、
 * 武器スキル由来（`WeaponSkillIncomingBuffDebuffCatalog`）、装備アビリティ由来
 * （`EquipmentAbilityIncomingBuffDebuffCatalog`）、特性由来（`AugmentGivenBuffDebuff`）、戦術スキル由来
 * （`TacticalSkillGivenBuffDebuff`）、発生源を束ねた汎用エントリ（`GenericSlowDebuff`＝移動速度減少、
 * `GenericHealingReduction`＝受ける治癒効果減少）を発生源を問わず1つに集約したもので、`statusOf()`での
 * state解決・`incoming-buffs.tsx`の追加UIの一覧表示の両方から共通で参照する。特性・その他恒久バフのうち
 * 「自身が選択して得る」効果（例: 特性「堅固」）は他者に与えるものではないため、このカタログには含まれない
 * （`selectable-self-buff-catalog.ts`側）
 */
export const IncomingBuffDebuffCatalog: Record<string, BuffDebuffDefinition> = {
    ...SubjectIncomingBuffDebuffCatalog,
    ...WeaponSkillIncomingBuffDebuffCatalog,
    ...EquipmentAbilityIncomingBuffDebuffCatalog,
    ...AugmentGivenBuffDebuff,
    ...TacticalSkillGivenBuffDebuff,
    ...GenericSlowDebuff,
    ...GenericHealingReduction
};
