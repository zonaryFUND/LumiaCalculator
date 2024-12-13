export const MoveSpeedCalculationConstants = {
    min: 1,
    heavySlowDefuse: {
        max: 2,
        ratio: 50
    },
    rawValueMax: 4.2,
    lightFastDefuse: {
        max: 5,
        ratio: 80
    },
    fasterDefuseRatio: 60
}

export const FasterBaseMoveSpeed = 
    MoveSpeedCalculationConstants.rawValueMax +
    (MoveSpeedCalculationConstants.lightFastDefuse.max - MoveSpeedCalculationConstants.rawValueMax) * MoveSpeedCalculationConstants.lightFastDefuse.ratio / 100;