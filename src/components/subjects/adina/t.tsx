import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { Status } from "components/subject/use-status";
import { ValuesProps } from "../values";
import { FormulaContext } from "../damage";

const t: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext);
    const ms = (() => {
        const base = Constants.T.movement_speed.base[status.skillLevels.T];
        const amp = Constants.T.movement_speed.amp;
        if (formula) {
            return <>
                {base}％
                <span className={style.amp}>(+スキル増幅の{amp}％)</span>
            </>
        } else {
            return <>{status.skillAmp.times(amp).dividedBy(100).add(base).toString()}％</>
        }
    })();

    return (
        <>
            <span className={style.emphasis}>スターゲイザー</span>：
            アディナはスキルを使用時に水晶玉のスロット(体力バーの下、2番目のスロット)にある天体を使用します。<br />
            アディナが天体をすべて消耗すると、{Constants.T.duration}秒間天体を満たす
            <span className={style.emphasis}>スターゲイザー</span>状態になり、
            移動速度が<span className={style.emphasis}>{ms}</span>増加します。
        </>
    )
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量", values: Constants.T.movement_speed.base},
    ]
}
