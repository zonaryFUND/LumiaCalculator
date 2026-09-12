# ingame-params/ について

実験体・装備・武器スキル・特性など、NimbleNeuronのAPIが公開していない「スキルがどう機能するか」に関する
値をTypeScriptで手動管理しているディレクトリ。各サブディレクトリの構成は
[../CLAUDE.md](../../CLAUDE.md)を参照。

このファイルには、個々のサブディレクトリの説明ではなく、複数の発生源（実験体スキル・武器スキル・
装備アビリティ・特性など）にまたがって共通する、手書きデータを書く際の注意事項を置く。

## バフ・デバフ定義（`buff-debuff.ts`）を書く際の注意点

### `buff(stack)`の返り値は、必ず`stack`を使って数値を組み立てること

`BuffDebuffDefinition.buff: (stack: number) => {...}`は、`stack`の値に応じたステータス変換量
（`StatusValueComponent`）を返す関数だが、**`statusOf()`は`state.stack`の値に関わらず常に
`def.buff(state.stack)`を呼び出す**（`core/subject-dynamic/status/calculation.ts`）。つまり
「stackが0のときは効果なし」を実現するのは呼び出し側の責務ではなく、`buff`関数の中身の数式の責務。

具体的には、`stack`が0のときに実質ゼロになるよう、返す値の数式に必ず`stack`（複数スタック可能な
バフなら`* stack`、1スタックのみ可能な＝チェックボックス型のバフなら`stack`は0か1しか取らないので
同じく`* stack`で自然にオン/オフになる）を含めること。

```ts
// 正しい例（1スタックのみ可能なバフでも、複数スタック可能なバフと同じ規約で`* stack`する）
buff: stack => ({
    defense: [{
        ...,
        value: { type: "constant", value: Constants.defenseDown * -1 * stack }
    }]
})

// 誤った例: stackを一切使っていないため、stack=0（チェックが外れている状態）でも
// 常に効果が適用されてしまう。UI上のチェックボックスや効果表示（0スタックのときは空になる）は
// 正しく見えるため気づきにくい
buff: stack => ({
    defense: [{
        ...,
        value: { type: "constant", value: Constants.defenseDown * -1 }
    }]
})
```

`buff`関数の**外側**（`selfBuffDefinitionsOf()`・`statusOf()`・UI側）で「`stack == 0`だから
`StatusValueComponent`自体を除外する」という制御は行わない方針。理由は2つ:

1. 複数スタック可能なバフは、元々効果量が`stack`に比例してスケールする設計であり、「1スタックのみ
   可能なバフだけ特別扱いして`StatusValueComponent`の有無で制御する」とすると、バフの種類によって
   実装方法が変わり一貫性がなくなる。
2. イレム・シルヴィアのような「切り替え式バフ」（`stackLabels`参照）は、`stack`を0/1のような
   スタック数ではなく「どの形態か」を表す状態IDとして使う。この場合`buff`関数は`stack`の値で
   `switch`のように分岐して対応する効果を返す必要があり、「`stack`が0かどうかで全体のon/offを切る」
   という発想とそもそも噛み合わない。

つまり「`stack`を渡された`buff`関数が、その`stack`の意味（スタック数／オン・オフ／状態ID）に応じて
正しい値を返す」という1つのルールだけで、3パターン（複数スタック・チェックボックス・切り替え式）すべてを
統一的に扱える設計になっている。

## バフ・デバフ実装の現状と残課題

アルファベット順の要件確認・実装・レビューのパス（[subjects/CHECKLIST.md](subjects/CHECKLIST.md)・
[equipment-abilities/CHECKLIST.md](equipment-abilities/CHECKLIST.md)・
[weapon-skills/CHECKLIST.md](weapon-skills/CHECKLIST.md)・[augment/CHECKLIST.md](augment/CHECKLIST.md)・
[tactical-skill/CHECKLIST.md](tactical-skill/CHECKLIST.md)）は、実験体固有スキル（`subjects/`）・
装備アビリティ（`equipment-abilities/`）・武器スキル（`weapon-skills/`）・特性（`augment/`）・
戦術スキル（`tactical-skill/`）の5カテゴリすべてで完了している（2026-09時点）。オブジェクト討伐バフ
（`perpetual-outer-buffs/`）も別方式（`constants.ts`を単一の情報源とする「辞書登録+配線」実装。
`perpetual-outer-buffs/index.ts`参照）で完了済み。これでバフ・デバフ実装のチェックリストパスは
全カテゴリ完了となった。実装方法自体（`buff(stack)`の規約、`SlowSourceInfo`による
スロウの一本化）はこのREADMEに従う想定。

以下は各カテゴリで対象外・未対応のまま残っている項目:

- **`rio`（莉央）のQ（替弓）皆中バフ**: 短弓時の自己移動速度・攻撃速度増加、和弓時の自己基本攻撃射程増加
  （既存の`fix`では正しく表現できない可能性がある「Qのパッシブで指定射程に変更した上でさらに増加を受ける」
  という挙動）、および対象の失った体力比例の基本攻撃ダメージ増加（対戦モード専用の独自ロジックが必要）。
  切り替え条件の特殊性から専用インタフェースの設計が必要と判断し、後回しにしている
  （`subjects/rio/buff-debuff.ts`の詳細コメント参照）。莉央は既に基本攻撃威力について特別な計算式
  （`subjects/rio/t.ts`のRioTStrategy）の対象になっており、Qの皆中バフも同様の専用実装が必要になる見込み。
- **`weapon-skills/camera`の視界減少デバフ**: 効果量（％や距離）を示すl10n・定数が見当たらず未実装
  （`weapon-skills/CHECKLIST.md`参照）。
- **`weapon-skills/*/buff-debuff.ts`から`core/value-ratio/extraction.ts`の`extractSkillLevel`を直接
  importすると循環参照でクラッシュする**: 回避策込みで詳細は`core/README.md`項目13・
  `weapon-skills/CHECKLIST.md`参照。
- **`increaseSkillDamageRatio`・`increaseSkillTypeDamageRatio`（与えるスキルダメージ増加、判定軸違いの
  2フィールド）・`increaseDamageRatio`（与えるダメージ増加）・`preventDamageRatio`等、`augment/`パスで
  Statusに新設した各種フィールドはいずれもインタフェース（Status算出）のみで、ダメージ計算側の消費は
  未実装**: `docs/known-issues.md`参照。
- **`augment/`特有の近似パターン**: 対象の状態に依存する効果は対象状態を仮定したON/OFF（例:
  `contemptForTheWeak`）、自身の現在体力に依存する効果は`currentHPRatio`から実際に算出（例: `frenzy`・
  `painkiller`・`bitterRetribution`）、装備の等級に依存する効果は`EquipmentStatusDictionary`の
  `itemGrade`から自動判定（`celestialCollection`）、他者バフがレベル依存の場合は`stack`を発生源レベルとして
  表現（`amplificationDrone`）。いずれも`augment/CHECKLIST.md`の各注記に詳細あり。
- **戦術スキル「強い絆」の`CharacterState`割り当ては推測**: 移動速度とダメージ吸血のどちらが
  `CharacterState/Group/Name/4107000`（「怒り」）・`4107010`（「守り」）に対応するか、テキストからの
  直接的な確証がなく推測で割り当てている（`tactical-skill/CHECKLIST.md`参照）。誤っていれば要修正。
