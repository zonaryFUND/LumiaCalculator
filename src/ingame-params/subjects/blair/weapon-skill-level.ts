export function weaponSkillLevel(mastery: number): number {
    if (mastery <= 5) return 0;
    if (mastery <= 10) return 1;
    if (mastery <= 15) return 2;
    return 3;
}