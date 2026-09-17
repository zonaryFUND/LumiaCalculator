// サポート系特性 数値
export default {
    // メイン特性
    // サボテン爆弾
    blastCactus : {
        // 持続時間
        duration: 4,
        //クールダウン
        cooldown: 8,
        // 威力
        damage: {
            level: 8,
            targetMaxHP: 6
        },
        // 起爆しなかったときの威力減少
        unexploded_decline: 50,
        // 野生動物を対象としたときの威力比
        animal_damage: 150,
        // 爆弾付着対象を攻撃した味方への移動速度バフ
        ally_movement_speed: {
            duration: 2,
            effect: 15
        }
    },
    // 増幅ドローン
    amplificationDrone: {
        // 効果範囲
        range: 4,
        // 持続時間
        duration: 4.5,
        // ステータスバフ
        status: {
            movementSpeed: {
                base: 10,
                level: 0.6
            },
            // 「与えるスキルダメージ種の割合増加」効果
            // 増幅ドローン専用
            skillDamageMultiplierRatio: {
                base: 8,
                level: 0.5
            },
        },
        cooldown: 30
    },
    // 治癒ドローン
    healingDrone: {
        // 効果範囲
        range: 4,
        // 発動に必要な自分または味方の現在体力割合
        threshold: 40,
        // 効果時間
        duration: 3,
        heal: {
            lostHP: {
                base: 3,
                level: 0.3
            }
        },
        cooldown: 30,
        // 複数発動時の回復量減少率
        multiple_reduction: 50
    },
    // 献身
    sentinel: {
        // 効果範囲
        range: 8,
        // シールド持続時間
        duration: 6,
        cooldown: 6,
        // 体力が減った対象へのシールド増加率
        shieldAmp: {
            // シールド増加発動しきい値
            threshold: 30,
            // 増加率
            effect: 1.5
        },
        // 対象の最大体力比シールド最大値
        maxShield: 35,
        shield: {
            base: 40,
            level: 5
        }
    },

    // サブ特性（左）
    // 狩りの戦慄
    thrillOfTheHant: {
        // 野生動物に対するダメージ増加
        damage_increase: 20,
        // 野生動物処置関与時自己回復（最小値）
        heal_min: {
            base: 60,
            attack: 5,
            amp: 3
        },
        // 自己回復最大倍率
        heal_max_multiplier: 3,
        // バフ持続時間
        duration: 2,
        // バフ効果
        status: {
            movementSpeed: 12
        },
        // クールダウン
        cooldown: 3
    },
    // イバラの棘
    thornShackles: {
        duration: 5,
        // 対象に与えるデバフ
        status: {
            hpHealedDecreaseRatio: 20,
            increaseDamagedRatio: 5
        },
        cooldown: 2
    },
    // 威圧感
    powerOfIntimidation: {
        // 効果範囲
        range: 3,
        // 対象に与えるデバフ
        status: {
            increaseDamagedRatio: 4
        },
        // 最大スタック数
        max_stack: 3,
        // スタックあたりの効果減少率
        effect_decline: 25
    },
    // 超再生
    healingFactor: {
        // 獲得すてーたうs
        status: {
            healerGiveHealShieldRatio: 6
        }
    },
    
    // サブ特性（右）
    // 後方支援
    logistics: {
        // 毎晩の望遠カメラ獲得数
        amount: 2
    },
    // コイントス
    coinToss: {
        // キル関与時クレジット追加獲得数（ランダム）
        coin: [
            7,
            12
        ]
    },
    // 割引券
    pennyPitcher: {
        // Kioskで買い物するときの値引き量
        amount: 20
    },
    // キャンピングガイド
    campingGuide: {
        // 毎晩のガジェットエネルギー追加獲得量
        gadgetEnergy: 10,
        // 料理直後のバフ
        movementSpeed: {
            effect: 0.8,
            duration: 5
        }
    }
}