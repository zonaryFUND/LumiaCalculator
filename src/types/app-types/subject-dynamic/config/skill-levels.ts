/**
 * 現在のスキルレベル　インゲーム値は1始まりだがこの型では0始まりなので、表記の際は1を足す
 * 
 * 武器スキルのレベルは熟練度によって決定されるためそれを独立で設定するためのプロパティは用意しない
 */
export type SkillLevels = {
    Q: number
    W: number
    E: number
    R: number
    T: number
}