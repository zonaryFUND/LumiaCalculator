export default {
    // ブリンク
    blink: {
        // Lv2 移動速度増加
        movementSpeed: {
            duration: 2.5,
            effect: 15
        },
        cooldown: [90,45]
    },
    // クエイク
    quake: {
        // 使用時スロウ
        slow: {
            duration: 2,
            effect: [40,50]
        },
        // 使用時ダメージ
        firstDamage: {
            base: [50,100],
            level: 10,
            additionalMaxHP: 10
        },
        // Lv2 使用後持続ダメージ
        dotDamage: {
            base: 10,
            level: 2,
            additionalMaxHP: 2.5
        },
        // 使用後持続ダメージ 持続時間
        duration: 6,
        // 使用後持続ダメージ発生周期
        tick: 0.5,
        cooldown: [40,30]
    },
    // プロトコル違反
    protocol_violation: {
        // 最大体力増加
        hpIncrease: {
            base: [100, 150],
            level: [10,15]
        },
        damage: {
            level: [5, 8],
            targetMaxHP: [7, 9]
        },
        // 複数個のプロトコル違反が命中したときの2つ目以降のダメージ量割合
        multipleHitDamageReduction: 50,
        cooldown: [60,45]
    },
    // 赤嵐
    electric_shift: {
        // 静電気状態持続時間
        duration: [10,12],
        // 基本攻撃射程増加
        range: [10,15],
        cooldown: [40,30]
    },
    // 超越
    forceField: {
        // 持続時間
        duration: 3,
        shield: {
            base: [150,200],
            additionalMaxHP: [80,100]
        },
        // 妨害耐性
        tenacity: {
            base: 10,
            additionalMaxHP: 3
        },
        cooldown: [40,30]
    },
    // アーティファクト
    totem: {
        // 持続時間
        duration: 2.5,
        cooldown: [90,45]
    },
    // リパルサーミサイル
    repulsorMissile: {
        // 発射弾数
        ammos: [5, 8],
        // 1発あたりダメージ
        damage: {
            base: 10,
            level: 1,
            targetMaxHP: 0.6
        },
        cooldown: [50, 40]
    },
    // 無効化
    nullification: {
        // 基礎移動速度持続時間
        duration: 1,
        // 移動速度増加
        movementSpeed: [20,30],
        // デバフ効果解除時の追加移動速度増加
        additionalMovementSpeed: {
            duration: 1,
            effect: 30
        },
        // Lv2 自分と周囲の味方の妨害耐性増加
        allyTenacity: {
            duration: 3,
            effect: 60
        },
        cooldown: [40,30]
    },
    // 強い絆
    soulStealer: {
        // 1エネルギー獲得に必要な体力消耗
        energyPerLoss: [1.5,1.2],
        // 蓄積可能な最大エネルギー
        maxEnergy: [70,99],
        // エネルギー蓄積持続時間
        energyDuration: 10,
        // 移動速度増加
        movementSpeed: {
            duration: 3,
            effect: {
                base: [20,30],
                energy: 0.4
            }
        },
        // ダメージ吸血
        lifeSteal: {
            base: [5,8],
            energy: 0.07
        },
        cooldown: [60,45]
    },
    // ストライダー - A13
    theStrider: {
        // 敵に向かって移動するときの移動速度増加
        movementSpeed: {
            duration: 5,
            effect: 30
        },
        damage: {
            base: [100,150],
            level: [5,10]
        },
        // 攻撃後の移動速度増加
        movementSpeedAfterAttack: {
            duration: 5,
            effect: {
                melee: [30,40],
                range: [20,30]
            }
        },
        // Lv2 ダメージを与えた対象の移動速度減少
        slow: {
            duration: 2,
            effect: {
                melee: 50,
                range: 30
            }
        }
    },
    // 真実の刃
    bladerOfTruth: {
        damage: {
            base: 140,
            level: 20
        },
        // Lv2 追加の刃によるダメージ
        secondDamage: {
            base: 50,
            level: 10
        },
        // 移動速度増加
        movementSpeed: {
            base: 20,
            // ダメージを与えた敵1体あたりの増加量（最大3体まで）
            perHit: [5,10]
        }
    },
    // ライトウィング
    wingsOfLight: {
        // 基本持続時間
        duration: 7,
        // 移動速度増加
        movementSpeed: {
            base: [15, 20],
            level: 1
        },
        // 攻撃速度増加
        attackSpeed: 20,
        // Lv2 基本攻撃1的中あたりの持続時間増加
        extend: 0.5,
        cooldown: [50, 40]
    },
    // 治癒の風
    healingWind: {
        heal: {
            base: 100,
            level: [8,12]
        },
        // Lv2 持続回復
        hot: {
            duration: 4,
            effect: {
                base: 100,
                level: 10
            }
        }
    },
    // プラズマダッシュ
    plasmaDash: {
        damage: {
            base: [120, 150],
            level: [5, 10]
        },
        // 移動速度減少
        slow: {
            duration: 1,
            effect: 30
        },
        // Lv2 防御力低下
        defense_down: {
            duration: 5,
            effect: 10
        },
        cooldown: [50,40]
    }
}