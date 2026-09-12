import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { HavocSlowSources } from "./havoc-buff-debuff";
import { ChaosSlowSources } from "./chaos-buff-debuff";
import { FortificationSlowSources } from "./fortification-buff-debuff";
import { SupportSlowSources } from "./support-buff-debuff";

/**
 * 特性由来のスロウ情報の全カテゴリ集約。実際のスロウ効果自体は個別実装せず汎用デバフ
 * （`ingame-params/buff-debuff/generic-slow.ts`）に一本化されるため、これは辞書UI表示専用の参照データ
 * （計算には一切関与しない）。`slow-dictionary.ts`から集約される
 */
export const AugmentSlowSourcesDictionary: SlowSourceInfo[] = [
    ...HavocSlowSources,
    ...ChaosSlowSources,
    ...FortificationSlowSources,
    ...SupportSlowSources
];
