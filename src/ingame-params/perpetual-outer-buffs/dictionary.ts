import Constants from "./constants";

export type PerpetualOuterBuffKey = keyof typeof Constants;

/**
 * `constants.ts`の各キーに対応する、表示名（l10n）とローカルID（`MiscBuffDebuff`のキー。
 * `SubjectConfig.selfBuffs`に保存される識別子でもあるため、一度公開した値は変更しない）の対応表。
 * `constants.ts`に新しい項目を追加した場合、ここにも対応するエントリを追加する必要がある
 * （`index.ts`側の型チェックで抜け漏れが検出される）
 */
export const PerpetualOuterBuffDictionary: Record<PerpetualOuterBuffKey, { localId: string, nameIntlID: string }> = {
    // 永続効果バフアイテム
    holyWater: { localId: "misc.holy-water-buff", nameIntlID: "CharacterState/Group/Name/503501" },
    zenVitality: { localId: "misc.zen-vitality-buff", nameIntlID: "CharacterState/Group/Name/503503" },
    tearsOfSelene: { localId: "misc.tears-of-selene-buff", nameIntlID: "CharacterState/Group/Name/503502" },
    combatEpinephrine: { localId: "misc.combat-epinephrine-buff", nameIntlID: "CharacterState/Group/Name/10021" },

    // 一時効果バフアイテム（カプセル）
    capsuleEssence: { localId: "misc.capsule-essence-buff", nameIntlID: "CharacterState/Group/Name/307001" },
    capsuleSanguine: { localId: "misc.capsule-sanguine-buff", nameIntlID: "CharacterState/Group/Name/307002" },
    capsuleGalaxy: { localId: "misc.capsule-galaxy-buff", nameIntlID: "CharacterState/Group/Name/307003" },

    // ボスモンスター討伐
    alphaEliminated: { localId: "misc.alpha-elimination-buff", nameIntlID: "CharacterState/Group/Name/5003000" },
    omegaEliminated: { localId: "misc.omega-elimination-buff", nameIntlID: "CharacterState/Group/Name/5003100" },

    // S.O.S.システム
    loneWolf: { localId: "misc.lone-wolf-buff", nameIntlID: "CharacterState/Group/Name/2310200" }
}
