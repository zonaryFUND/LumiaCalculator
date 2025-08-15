/**
 * 移動速度に補正をかける時の閾値や倍率をまとめた構造体
 */
export const MoveSpeedCalculationConstants = {
    /**
     * 移動速度の最小値
     */
    min: 1,

    /**
     * 非常に小さい移動速度と判断される閾値と、閾値を下回る場合に最小値に追加される移動速度の補正値
     */
    heavySlowDefuse: {
        max: 2,
        ratio: 50
    },

    /**
     * 計算結果の移動速度が補正なしにそのまま適用される最大値
     */
    rawValueMax: 4.2,

    /**
     * やや大きい移動速度と判断される閾値と、閾値を下回る場合に補正なし最大値に追加される移動速度の補正値
     */
    lightFastDefuse: {
        max: 5,
        ratio: 80
    },

    /**
     * 非常に大きい移動速度の場合の補正値
     */
    fasterDefuseRatio: 60
}

/**
 * 移動速度が非常に大きい場合、補正なし最大値～弱補正最大値の区間の値に、その補正値をかけて追加した値
 * 
 * 非常に大きい速度と判断される閾値を上回る値に最大補正をかけ、最後にこの値を追加する
 */
export const FasterBaseMoveSpeed = 
    MoveSpeedCalculationConstants.rawValueMax +
    (MoveSpeedCalculationConstants.lightFastDefuse.max - MoveSpeedCalculationConstants.rawValueMax) * MoveSpeedCalculationConstants.lightFastDefuse.ratio / 100;