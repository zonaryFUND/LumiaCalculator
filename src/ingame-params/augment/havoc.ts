// 破壊系特性　数値
export default {
    // メイン特性
    // 絶対武力
    frailtyInfliction: {
        // 発動条件を満たす制限時間
        timeBound: 5,
        // 発動に必要な攻撃的中回数
        threshold: 3,
        damage: {
            base: 20,
            level: 5
        },
        // 防御力減少
        defenseReduction: {
            duration: 6,
            effect: 15
        },
        cooldown: 15
    },
    // 吸血鬼
    vampiricBloodline: {
        // 1スタックあたりの効果量
        stack: {
            adaptiveForce: 1,
            lifeSteal: {
                melee: 1.5,
                range: 1
            }
        },
        // スタック持続時間
        duration: 6,
        // 最大スタック数
        maxStack: 8,
        // 最大スタック時に追加で得られるステータス
        maxAdditionalStatus: {
            adaptiveForce: {
                base: 7,
                level: 0.5
            }
        },
        // DoTの命中判定周期
        period: 4
    },
    // アドレナリン
    adrenaline: {
        // スタック持続時間
        duration: 5,
        // 最大スタック数
        maxStack: 6,
        // 1スタックあたり効果量
        stack: {
            attackSpeed: {
                melee: {
                    base: 2,
                    level: 0.2
                },
                range: {
                    base: 1.5,
                    level: 0.15
                }
            }
        },
        // 最大スタック時に追加で得られるステータス
        maxAdditionalStatus: {
            // 攻撃速度上限無視
            attackSpeed: {
                melee: {
                    base: 20,
                    level: 1.5
                },
                range: {
                    base: 15,
                    level: 1
                }
            },
            movementSpeed: 7
        }
    },
    // アクセルレート
    accelerator: {
        // 攻撃速度が増加する基本攻撃の回数
        count: 3,
        // 追加攻撃速度（攻撃速度上限無視）
        attackSpeed: 120,
        // 追加攻撃速度バフ持続時間
        duration: 3,
        damage: {
            // 注：基礎ダメージ量の増大法則は現時点で不明
            base: [
                20,
                20,
                20,
                20,
                25,
                30,
                35,
                40,
                45,
                55,
                63,
                72,
                81,
                90,
                100,
                114,
                127,
                140,
                155,
                170
            ],
            additionalAttack: 60,
            amp: 40
        }
    },

    // サブ特性（左）
    // 劣勢克服
    dismantleGoliath: {
        // この特性が発動するのに最低限必要な、自身の最大体力に対する相手の最大体力超過割合
        min: 10,
        // この特性による効果量が最大となる、自身の最大体力に対する相手の最大体力超過割合
        max: 40,
        // 最大体力超過割合に対する与ダメージ上昇量バフの乗算値
        multiplier: 0.25
    },
    // 狂奔
    frenzy: {
        // 効果が発動する最大体力に対する現在体力割合のしきい値
        minHp: 80,
        // しきい値における効果量
        minEffect: 5,
        // 効果が飽和する最大体力に対する現在体力割合
        maxHP: 40,
        // 飽和時における効果量
        maxEffect: 10,
    },
    // 弱者蔑視
    contemptForTheWeak: {
        // 効果が発動する対象体力割合の最大値
        threshold: 40,
        // 与ダメージ増加量
        effect: 8
    },
    // 傷跡
    cicatrix: {
        // 治療減少スタック持続時間
        duration: 5,
        // 1スタックあたりの治癒減少
        healingReduction: 10,
        // 最大スタック数
        maxStack: 2,
        // 持続ダメージを与える効果に対する判定周期
        period: 1,
        // 最大スタックの対象に対する攻撃命中時追加ダメージ
        maxStackDamage: {
            base: 10,
            level: 1,
            targetMaxHP: 3
        },
        // 追加ダメージクールダウン
        cooldown: 5
    },

    // サブ特性（右）
    // 狩猟 - 熊
    bearMask: {
        // スタック0のときの追加ステータス
        base: {
            adaptiveForce: 2
        },
        // 最大スタック数
        maxStack: 80,
        // スタックあたり追加ステータス
        stackBuff: {
            // 追加ステータスを1単位分獲得するのに必要なスタック数
            per: 10,
            // 追加ステータス量
            effect: {
                adaptiveForce: 1
            }
        }
    },
    // 狩猟 - イノシシ
    boarMask: {
        // スタック0のときの追加ステータス
        base: {
            maxHP: 25
        },
        // 最大スタック数
        maxStack: 80,
        // スタックあたり追加ステータス
        stackBuff: {
            // 追加ステータスを1単位分獲得するのに必要なスタック数
            per: 10,
            // 追加ステータス量
            effect: {
                maxHP: 20
            }
        }
    },
    // 狩猟 - オオカミ
    wolfMask: {
        // スタック0のときの追加ステータス
        base: {
            attackSpeed: 4
        },
        // 最大スタック数
        maxStack: 80,
        // スタックあたり追加ステータス
        stackBuff: {
            // 追加ステータスを1単位分獲得するのに必要なスタック数
            per: 10,
            // 追加ステータス量
            effect: {
                attackSpeed: 2.5
            }
        }
    },
    // 狩猟 - ハウンド
    wildDogMask: {
        // スタック0のときの追加ステータス
        base: {
            lifeSteal: 1
        },
        // 最大スタック数
        maxStack: 80,
        // スタックあたり追加ステータス
        stackBuff: {
            // 追加ステータスを1単位分獲得するのに必要なスタック数
            per: 10,
            // 追加ステータス量
            effect: {
                lifeSteal: 1
            }
        }
    },

}