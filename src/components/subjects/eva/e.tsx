import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エヴァが{Constants.E.movement_speed.duration}秒間移動速度が{Constants.E.movement_speed.effect[props.skillLevel]}
            %増加し、バイタルフォース{Constants.E.vitalforce}を獲得する代わりに移動以外の行動ができなくなります。<br />
            また、{Constants.E.vision_duration}秒間地形に関係なく視界を確保できる状態になります。持続時間の間、敵にスキルでダメージを与えた場合には
            {Constants.E.vflight_duration}秒間VFライトを発射して<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。<br />
            VFライトは<span className={style.emphasis}>VF放出</span>の基本ダメージを受けた対象には発動せず、スタックダメージを受けた対象に発動します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>移動速度が増加した場合、衝突を無視します。<br />VFライトを発射する間、地形と関係なく視界を確保します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度増加量(%)", values: Constants.E.movement_speed.effect, percent: true},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
