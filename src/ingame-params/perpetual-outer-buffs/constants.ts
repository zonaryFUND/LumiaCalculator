export default {
    // 永続効果バフアイテム
    // 聖水
    holyWater: {
        defense: 9   
    },
    // 大還丹
    zenVitality: {
        maxHp: 90
    },
    // セレーネーの涙
    tearsOfSelene: {
        adaptiveForce: 6
    },
    // コンバット・エピネフリン
    combatEpinephrine: {
        movementSpeed: 0.1
    },
    
    // 一時効果バフアイテム（カプセル）
    // カプセル - 生命
    capsuleEssence: {
        maxHp: 130,
        tenacity: 5
    },
    // カプセル - 鮮血
    capsuleSanguine: {
        attack: 8,
        lifeSteal: 4
    },
    // カプセル - 宇宙
    capsuleGalaxy: {
        adaptiveForce: 3,
        cooldownReduction: 10
    },

    // ボスモンスター討伐
    // アルファ処置
    alphaEliminated: {
        adaptiveForce: 3
    },
    // オメガ処置
    omegaEliminated: {
        defense: 3
    },

    // S.O.S.システム
    // ペアユニット(1人死亡)は非戦闘時効果のみなので実装しない

    // 孤独な狼(2人死亡)
    loneWolf: {
        adaptiveForce: 15,
        preventDamageRatio: 5
    }
}