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