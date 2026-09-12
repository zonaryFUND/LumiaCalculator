import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { AugmentBuffDebuff } from "@app/ingame-params/augment/buff-debuff";
import { TacticalSkillBuffDebuff } from "@app/ingame-params/tactical-skill/buff-debuff";
import { MiscBuffDebuff } from "@app/ingame-params/perpetual-outer-buffs";
import { BuffDebuffDefinition } from "./type";

/**
 * ユーザーが`incomingBuffs`と同様にカタログから選んで自ら追加・削除する自己バフ（特性・戦術スキル・
 * その他恒久バフ）の全カタログ。`autoSelfBuffDefinitionsOf`（`self-buff-definitions.ts`）と異なり、
 * 発生源が「選択中の実験体固有スキル」や「装備中のアイテム」に紐付かない（どの実験体・装備の組み合わせでも
 * 特性・戦術スキル・その他恒久バフを持ちうる）ため、実験体・装備の変更に連動して自動投入・削除されることは
 * ない（`self-buff-definitions.ts`の`reconcileSelfBuffs`参照）。
 *
 * 3つの発生源のうち`augment`は効果量がレベル・実験体自身のステータス（例:「渦流」の回復量）・自身の現在
 * 体力割合（例:「狂奔」の生命力吸収）に依存しうるため`config`・`status`・`currentHPRatio`をすべて受け取る。
 * `currentHPRatio`は`SubjectPerpetualStatus`・`EquipmentAbilityPerpetualStatus`と同様に`statusOf()`の引数が
 * そのまま素通しされる（`self-buff-definitions.ts`参照）
 */
export function selectableSelfBuffCatalogOf(config: SubjectConfig, status: Status, currentHPRatio: number): Record<string, BuffDebuffDefinition> {
    return {
        ...AugmentBuffDebuff(config, status, currentHPRatio),
        ...TacticalSkillBuffDebuff(config, status),
        ...MiscBuffDebuff
    };
}
