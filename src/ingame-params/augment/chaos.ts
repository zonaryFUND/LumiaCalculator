// カオス系特性　数値
export default {
    // メイン特性
    // ステラチャージ
    stellarCharge: {
        // ステラスタック持続時間
        timeBound: 5,
        // ステラスタック最大値
        maxStack: 3,
        // 効果発動後持続時間
        duration: 5,
        // ダメージ
        damage: {
            base: 30,
            level: 2
        },
        // 効果発動時基本スキルクールダウン減少
        cooldownReduction: 35,
        // ステラチャージクールダウン
        cooldown: 15,
        // 野生動物に発動したときの追加ダメージ倍率
        animalDamageMultiplier: 2,
        // 野生動物に発動したときの基本スキルクールダウン減少
        animalCooldownReduction: 15,
        // 野生動物に発動したときのステラチャージクールダウン
        animalCooldown: 6
    },
    // 鬼火
    ghostLight: {
        // 発動条件
        threshold: {
            // 発動させるために与えるダメージ（敵最大体力比）
            hp: 30,
            // この時間（秒）以内に敵体力を減らす
            time: 3
        },
        // ダメージ
        damage: {
            base: 70,
            level: 10,
            additionalAttack: 70,
            amp: 20
        },
        // 治癒減少効果量
        healingReduction: 30,
        // 持続時間
        duration: 5,
        // この秒数以上敵に攻撃しない場合、クールダウン減少が2倍に加速
        cooldownAcceleration: 5,
        // クールダウン
        cooldown: 30
    },
    // 霹靂
    redSprite: {
        damage: {
            base: 30,
            level: 2,
            additionalAttack: 65,
            amp: 26
        },
        cooldown: 9,
        // 一定距離以上離れている敵に発動時、ダメージ増加
        damageAmp: {
            // 必要な距離
            range: 5,
            // 効果量
            effect: 20
        },
        // 発動対象の敵の近くに別の敵がいる場合、転移
        transport: {
            // 転移範囲
            range: 4,
            // 転移ダメージの元ダメージからの減少量
            damageReduction: 20
        },
        // 敵にスキルダメージを与えるごとの霹靂クールダウン減少
        cooldownReduction: {
            // 単体対象スキル
            singleTarget: 12,
            // 範囲スキル
            aoe: 5,
            // 持続スキル
            dot: 2
        }
    },
    // 渦流
    syphonMaelstorm: {
        // 発動させるために条件を満たす時間の制限
        timeBound: 3,
        // 発動に必要な攻撃的中回数
        threshold: 2,
        // 持続時間
        duration: 2.5,
        // 移動速度減少
        movementSpeed: {
            melee: 10,
            range: 5
        },
        damage: {
            level: 5,
            additionalAttack: 80,
            amp: 40
        },
        // 自己回復量
        heal: {
            additionalAttack: 70,
            amp: 20,
            maxHP: 8,
            lostHP: 10
        },
        // 過流が複数人に的中したときの追加人数ごとの回復量増加
        additionalHealPerHit: 40,
        // 追加的中による回復量増加の上限
        additionalHealMax: 80,
        // 最大体力を超えて回復するぶんの持続時間
        overhealDuration: 5,
        cooldown: 20
    },

    // サブ特性（左）
    // サーキュラーシステム
    circularSystem: {
        // HoTの総回復量
        heal: {
            base: 10,
            level: 1,
            maxHP: 0.3
        },
        // HoTの持続時間
        duration: 3
    },
    // 傷の悪化
    openWounds: {
        // DoTの総ダメージ量
        damage: {
            base: 10,
            level: 2,
            targetHP: 8
        },
        // DoTの持続時間
        duration: 2,
        // クールダウン
        cooldown: 10
    },
    // 徹甲弾
    stoppingPower: {
        // 持続時間
        duration: 6,
        // 獲得ステータス
        effect: {
            penetrationDefense: 6
        },
        cooldown: 12
    },
    // 速射
    quickDraw: {
        // スキル使用後、発動のために基本攻撃を的中させるまでの猶予
        timeBound: 3,
        // 追加バフ持続時間
        duration: 6,
        status: {
            adaptiveForce: {
                base: 2,
                level: 0.5
            },
            attackSpeed: 15,
        },
        cooldown: 15
    },

    // サブ特性（右）
    // 力の蓄積
    powerCrescendo: {
        // ゲーム内時刻ごとの適合能力値獲得量
        adaptiveForce: [
            0,  // 1日目昼
            1,  // 1日目夜
            2,  // 2日目昼
            3,  // 2日目夜
            4,  // 3日目昼
            6,  // 3日目夜
            8,  // 4日目昼
            10, // 4日目夜
            12, // 5日目昼
            14, // 5日目夜
            16, // 6日目昼
            16, // 6日目夜
            16  // 7日目
        ]
    },
    // オーバーウォッチ
    overwatch: {
        // バフ効果
        status: {
            cooldownReduction: 5,
        },
        // 追加バフ獲得に必要なクールダウン減少
        threshold: 40,
        // 追加バフ効果
        additionalStatus: {
            adaptiveForce: 5
        }
    },
    // R_echarger
    r_echarger: {
        effect: {
            ultCooldownReduction: 15
        },
        rActivateBuffDuration: 5,
        rActivateBuff: {
            adaptiveForce: {
                base: 5,
                level: 0.5
            }
        },
        cooldown: 20
    },
    // 極上のコレクション
    celestialCollection: {
        heroic: {
            5: {
                adaptiveForce: 2
            }
        },
        legendary: {
            1: {
                adaptiveForce: 3
            },
            2: {
                defense: 2
            },
            3: {
                maxHP: 40
            },
            4: {
                movementSpeed: 1
            },
            5: {
                penetrationDefenseRatio: 1
            }
        },
        mythic: {
            1: {
                lifeSteal: 3
            },
            2: {
                tenacity: 5
            }
        }
    }
}