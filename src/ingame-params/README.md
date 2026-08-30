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
