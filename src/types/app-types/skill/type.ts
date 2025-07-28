/**
 * 実験体のスキル
 * 複数の実験体に共通する武器スキル、戦術スキルは含まない
 */
export type SubjectDependentSkillKey = "Q" | "W" | "E" | "R" | "T";

/**
 * 武器スキルを含む実験体の全スキルのKey
 */
export type SkillKey = SubjectDependentSkillKey | "D";

/**
 * 武器スキルを含む実験体の全スキルのKey配列
 */
export const SubjectSkillKeys: SubjectDependentSkillKey[] = ["Q", "W", "E", "R", "T"]