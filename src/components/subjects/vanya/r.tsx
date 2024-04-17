import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            幻想の蝶が風を起こして眠り粉をまき散らしながら<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。攻撃された対象は
            <span className={style.emphasis}>{Constants.R.drowsy}</span>秒間眠くなって移動速度が徐々に減少し、
            <span className={style.emphasis}>{Constants.R.sleep}</span>秒間睡眠状態になります。<br />
            <br />
            睡眠状態では攻撃されると<Damage skill="R" constants={Constants.R.wakeup_damage} {...props} />のスキルダメージを受けて眠りから覚めます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "幻想の羽風ダメージ量", values: Constants.R.damage.base},
        {title: "睡眠追加ダメージ量", values: Constants.R.wakeup_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}