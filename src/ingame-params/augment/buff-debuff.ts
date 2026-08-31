import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig } from "core/subject-dynamic/config";
import Fortification from "./fortification";

/**
 * 特性由来の選択式自己バフ（`origin: "augment"`）。ユーザーが`self-buffs.tsx`の追加UIから任意に選択する
 * （`selectable-self-buff-catalog.ts`参照）。id命名は他の選択式カタログ（`item-skill.*`）に倣い
 * `augment.<特性名>`とする。
 *
 * 現時点では「堅固」（`Trait/Name/7110401`）のみ実装（バフ・デバフ選択式自己バフのインターフェース検証用の
 * サンプル）。他の特性は旧`perpetual-outer-buffs/augment.ts`（`origin: "perpetual_status"`前提の旧設計。
 * 本インターフェース設計時に不要と判断し削除済み）に効果量の参照実装があったが、この形式には未移植。
 * 元の数値自体は`./havoc.ts` `./chaos.ts` `./fortification.ts`に残っているため、移植時はそちらを参照する
 */
export const AugmentBuffDebuff = (config: SubjectConfig): Record<string, BuffDebuffDefinition> => ({
    "augment.steadfast": {
        origin: "augment",
        nameIntlID: "Trait/Name/7110401",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "Trait/Name/7110401",
                value: {
                    type: "constant",
                    value: (Fortification.steadfast.tenacity.base + Fortification.steadfast.tenacity.level * config.level) * stack
                }
            }]
        })
    }
});
