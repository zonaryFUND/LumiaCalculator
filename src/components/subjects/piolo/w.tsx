import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>弾き</span>：ピオロが自分を中心に双節棍を素早く振り回して{Constants.W1.duration}秒間阻止不可状態になり、敵の投射体を弾いて消滅させます。スキル終了後、
            <span className={style.emphasis}>振り回し</span>が活性化します。<br />
            <br />
            <span className={style.enhance}>振り回し</span>：ピオロが飛び上がりながら双節棍を大きく振り回して周りの敵に
            <Damage skill="W" constants={Constants.W2.damage} {...props} />のスキルダメージを与えます。ピオロは振り回しの間、移動速度が{Constants.W2.movement_speed}%増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <><span className={style.emphasis}>弾き</span>キャスト中、移動速度が{Constants.W1.movement_speed_penalty}％減少します。</>,
    parameters: [
        {title: "[振り回し]ダメージ量", values: Constants.W2.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
