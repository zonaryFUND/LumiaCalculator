import { SubjectConfig } from "../config";

/**
 * 武器熟練度から武器スキルのレベルを得る
 * @param mastery 武器熟練度
 * @returns ゲーム内のスキルレベル-1
 */
export function weaponSkillLevel(mastery: number): number {
    if (mastery < 10) return 0;
    if (mastery < 15) return 1;
    return 2;
}