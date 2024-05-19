export function weaponSkillLevel(mastery: number): number {
    if (mastery < 10) return 0;
    if (mastery < 15) return 1;
    return 2;
}