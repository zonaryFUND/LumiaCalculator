import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 替弓(Q)の皆中バフ（短弓時: 自己移動速度・攻撃速度増加／和弓時: 自己基本攻撃射程増加）は、以下の理由で
// 現時点では実装せず、コメントのみ残す。
//
// - 短弓・和弓はQで自由に切り替えられるが、上記バフ自体は「皆中」という別条件（Q使用等）を満たさないと
//   得られないため、単純な切り替え式自己バフ（イレムやブレアのような形態プルダウン）としては表現できない。
// - 和弓の射程増加は、「Qのパッシブ効果で基本攻撃射程がConstants.Q.daikyu_range（レベル依存の固定値）に
//   変更された上で、さらにそこへ皆中による射程増加が加算される」という2段階の挙動を取る。既存の
//   `calculationType: "fix"`（無条件に最終値を上書きする）では、この「まず固定値へ変更してから加算する」
//   構造を正しく表現できない可能性が高い（`fix`は他の`sum`/`mul`成分を無視して丸ごと上書きするため）。
//   `sum`成分としてConstants.Q.daikyu_range[レベル]自体を注入する等、専用の実装方針が必要
//   （実験体固有の`SubjectPerpetualStatus`/専用ロジックの追加を検討）。
// - 和弓の皆中バフにはさらに「対象の失った体力1%あたり基本攻撃ダメージ0.3%増加
//   （Constants.Q.daikyu_damage_enhance）」という補正効果があり、これは対戦モードの対象体力を参照する
//   独自ロジックが必要（通常のバフ・デバフ機構では表現できない）。
//
// 莉央は既に基本攻撃威力について特別な計算式（`t.ts`のRioTStrategy、`damage-table.ts`参照）の対象となって
// いるため、Qの皆中バフについても将来的に同様の専用インタフェースを実装する方針とする

// 離れ(W)の移動速度減少は短弓・和弓で効果量が異なり、正射必中(和弓R)にも移動速度減少がある
// （短弓Rには移動速度減少効果自体が存在しない）。汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.rio.hankyu-w-slow", values: [Constants.W.hankyu_slow.effect] },
    { nameIntlID: "subject.rio.daikyu-w-slow", values: [Constants.W.daikyu_slow.effect] },
    { nameIntlID: "subject.rio.daikyu-r-slow", values: [Constants.R.daikyu_slow.effect] }
];
