/**
 * 実験体に付与されているバフ・デバフ1件ぶんの状態
 *
 * `id`単独では発生源（実験体スキル/装備アビリティ/特性）を判別できないが、`SubjectConfig`の
 * `selfBuffs`/`incomingBuffs`のどちらの配列に含まれるかで自己／他者は区別済みなので問題ない。
 * 同一`id`を持つ要素が配列内に複数存在しうる（例: 複数の発生源から同時にスロウを受ける）。
 */
export type BuffDebuffState = {
    id: string
    stack: number
}
