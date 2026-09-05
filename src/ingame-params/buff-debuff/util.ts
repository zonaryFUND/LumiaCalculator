export const CommonSkillLevelLabelsMax5 = [
    "buff-debuff.common.none",
    "buff-debuff.common.skill-level.1",
    "buff-debuff.common.skill-level.2",
    "buff-debuff.common.skill-level.3",
    "buff-debuff.common.skill-level.4",
    "buff-debuff.common.skill-level.5"
]

/**
 * 「発生源（実験体）のレベル」をstackとして表現するバフ・デバフの`stackLabels`（0=なし、1..max=そのレベル）。
 * 例: 戦術スキル「プロトコル違反」の体力増加は発生源のレベルに応じて効果量が変化する
 * （`tactical-skill/buff-debuff.ts`参照）。`buff-debuff.common.level.1`〜`.20`（`main.json`）を使う
 */
export const CommonLevelLabels = (max: number): string[] => [
    "buff-debuff.common.none",
    ...Array.from({ length: max }, (_, i) => `buff-debuff.common.level.${i + 1}`)
]

/**
 * 「0%刻みの割合」をstackとして表現するバフ・デバフの`stackLabels`（0=0%、maxStack=max%）。
 * 例: 移動速度減少の汎用デバフ（`generic-slow.ts`）は5%刻みで0〜100%を選べる
 * （`CommonPercentLabels(100, 5)`）。`buff-debuff.common.percent.0`〜`.100`（`main.json`）を使う
 */
export const CommonPercentLabels = (max: number, step: number): string[] =>
    Array.from({ length: max / step + 1 }, (_, i) => `buff-debuff.common.percent.${i * step}`)

/**
 * 「N刻みのスタック数」をstackとして表現するバフ・デバフの`stackLabels`（0=0、maxStack=max）。
 * `CommonPercentLabels`と似ているが、単位が％ではなく素のスタック数（例: 装備アビリティ「軽い足取り」の
 * 最大100スタックを、1刻みではなく25刻みの5段階で選択させる。`CommonPercentLabels(100, 25)`だと
 * 「25%」のような誤った単位表記になってしまうため専用に用意）。`buff-debuff.common.stack.0`〜
 * （`main.json`）を使う
 */
export const CommonStackLabels = (max: number, step: number): string[] =>
    Array.from({ length: max / step + 1 }, (_, i) => `buff-debuff.common.stack.${i * step}`)

/**
 * 実験体固有スキルのホットキー表記（Q/W/E/R/T）のIntlメッセージID。`SlowSourceInfo.nameIntlID`のように、
 * 「発生源（実験体名）は別途表示されるので、どのスキルかだけ示せればよい」場面で使う
 * （`buff-debuff.common.skill-key.q`〜`.t`、`main.json`）
 */
export const SkillKeyLabels = {
    Q: "buff-debuff.common.skill-key.q",
    W: "buff-debuff.common.skill-key.w",
    E: "buff-debuff.common.skill-key.e",
    R: "buff-debuff.common.skill-key.r",
    T: "buff-debuff.common.skill-key.t"
} as const