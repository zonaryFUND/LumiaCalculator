import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const ms = (() => {
        if (showEquation) {
            return <>
                {Constants.T.movement_speed.base[props.skillLevel]}%
                <span className={style.amp}>(+スキル増幅の{Constants.T.movement_speed.amp}%)</span>
            </>
        } else {
            return <><Value skill="T" ratio={Constants.T.movement_speed} />%</>;
        }
    })();

    return (
        <>
            <span className={style.emphasis}>スターゲイザー</span>：
            アディナはスキルを使用時に水晶玉のスロット(体力バーの下、2番目のスロット)にある天体を使用します。<br />
            アディナが天体をすべて消耗すると、{Constants.T.duration}秒間天体を満たす
            <span className={style.emphasis}>スターゲイザー</span>状態になり、移動速度が
            <span className={style.emphasis}>{ms}</span>増加します。
        </>
    )
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量", values: Constants.T.movement_speed.base},
    ]
}
