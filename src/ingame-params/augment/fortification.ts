// 抵抗系特性　数値
export default {
    // メイン特性
    // 金剛
    diamondShard: {
        // 効果時間
        duration: 3,
        // ステータスバフ
        status: {
            defense: {
                base: 20,
                level: 5
            }
        },
        damage: {
            level: 10
        },
        // 効果半径
        range: 3,
        slow: {
            effect: 40,
            duration: 1.5
        },
        cooldown: 20
    },
    // 不壊
    ironclad: {
        // ステータスバフ
        status: {
            preventDamageRatio: {
                melee: {
                    base: 10,
                    level: 1
                },
                range: {
                    base: 7,
                    level: 1
                }
            },
            tenacity: {
                melee: {
                    base: 20,
                    defense: 15
                },
                range: {
                    base: 12,
                    defense: 15
                }
            }
        },
        // 効果時間
        duration: {
            melee: 3,
            range: 2.5
        },
        cooldown: 20
    },
    // 光の守護
    heavyKneepads: {
        shield: {
            maxHP: 18
        },
        // シールド破壊時バフ効果時間
        buffDuration: {
            melee: 1,
            range: 0.5
        },
        // ステータスバフ
        status: {
            movementSpeed: 50
        },
        cooldown: 25,
        // 野生動物によってシールドが破壊された時のクールダウン変換
        animalCooldownReduction: 70
    },
    // 応報
    bitterRetribution: {
        // 最大体力比被ダメージ割合に対するスタック獲得数
        stackPerLostHp: 1,
        // 最大スタック数
        max_stack: 30,
        // 1スタック当たりのバフステータス
        status: {
            preventDamageRatio: 0.2
        },
        // スタック消耗時スロウ（近距離実験体）
        melee_slow: {
            duration: 1.5,
            effect: 50
        },
        // スタック消耗時ダメージ
        damage: {
            level: 15
        },
        //クールダウン
        cooldown: 2,
        // スタック非消耗時回復量
        recover_per_stack: 0.5
    },

    // サブ特性（左）
    // 大胆
    embolden: {
        // 防御力バフ
        status: {
            defense: {
                base: 5,
                level: 1
            }
        },
        // 効果時間
        duration: 4,
        cooldown: 8
    },
    // 鎮痛剤
    painkiller: {
        threshold: 40,
        // 防御力バフの最大値
        maxStatus: {
            defense: 12
        }
    },
    // 不屈
    unwaveringMentality: {
        shield: {
            level: 15
        },
        // シールド効果時間
        duration: 3,
        cooldown: 20
    },
    // 警戒心
    caution: {
        // 効果が発動する最大体力に対する現在体力割合のしきい値
        threshold: 75,
        // 効果時間
        duration: 1.5,
        status: {
            preventDamageRatio: {
                base: 5,
                level: 0.5
            }
        },
        cooldown: 20
    },

    // サブ特性（右）
    // 堅固
    steadfast: {
        status: {
            tenacity: {
                base: 12,
                level: 0.4
            }
        }
    },
    // 食いしん坊
    dineNDash: {
        // 食べ物消費時間減少
        foodConsumptionReduction: 3,
        // 食べ物回復量の最小値補正
        minRecovery: 660,
    },
    // 特攻隊
    cavalcade: {
        // ステータスバフ
        status: {
            preventDamageRatio: 4
        },
        // 周辺に味方がいないと判断される半径
        range: 3.5
    },
    // 熱処理
    tempering: {
        // 2日目昼に得られる防御力
        status: {
            defense: 3
        },
        additionalStatus: {
            defense: 1
        },
        // スタック追加獲得周期
        cycle: 80
    },
}