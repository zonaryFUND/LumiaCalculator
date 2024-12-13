import { FasterBaseMoveSpeed, MoveSpeedCalculationConstants } from "app-types/subject-dynamic/status/value/move-speed";
import { MovementSpeedValue } from "app-types/subject-dynamic/status/value/type";
import * as React from "react";

const moveSpeedSubRow: React.FC<MovementSpeedValue> = props => {
    const rawResult = (
        <tr>
            <td>計算値</td>
            <td>{props.rawResult.toString()}</td>
        </tr>
    );

    if (props.rawResult.lessThan(0)) {
        return (
            <>
                {rawResult}
                <tr><td>最低値</td><td>{MoveSpeedCalculationConstants.min}</td></tr>
            </>
        )
    }

    if (props.rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.heavySlowDefuse.max)) {
        return (
            <>
                {rawResult}
                <tr>
                    <td>補正</td>
                    <td><span>最低値</span>{MoveSpeedCalculationConstants.min} + <span>計算値</span>{props.rawResult.toString()} x {MoveSpeedCalculationConstants.heavySlowDefuse.ratio}%</td>
                </tr>
            </>
        )
    }

    if (props.rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.rawValueMax)) {
        return null;
    }

    if (props.rawResult.lessThanOrEqualTo(MoveSpeedCalculationConstants.lightFastDefuse.max)) {
        return (
            <>
                {rawResult}
                <tr>
                    <td>補正</td>
                    <td><span>非補正最大値</span>{MoveSpeedCalculationConstants.rawValueMax} + (<span>計算値</span>{props.rawResult.toString()} - {MoveSpeedCalculationConstants.rawValueMax}) x {MoveSpeedCalculationConstants.lightFastDefuse.ratio}%</td>
                </tr>
            </>
        )
    }

    return (
        <>
            {rawResult}
            <tr>
                <td>補正</td>
                <td>
                    <><span>非補正最大値+5.0までの増分計算値</span>{FasterBaseMoveSpeed} + </>
                    (<span>計算値</span>{props.rawResult.toString()} - {FasterBaseMoveSpeed}) x {MoveSpeedCalculationConstants.fasterDefuseRatio}%</td>
            </tr>
        </>
    )
}

export default moveSpeedSubRow;