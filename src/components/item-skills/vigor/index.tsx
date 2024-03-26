import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    return (
        <span className={style.maxhp}>現在体力の{props.values.dmg.enemyHP}％</span>
    )
};

const description: React.FC<Props> = props => {
    return (
        <p>
            基本攻撃が敵実験体に命中すると、敵実験体の<Value {...props} />のスキルダメージを与え、{props.values.duration}秒間情熱スタックを獲得します。
            獲得した情熱スタック1あたり{props.values.as}％の攻撃速度を獲得し、最大{props.values.stack}スタックになると、{props.values.max.ad}の攻撃力{props.values.max.ms ? `と${props.values.max.ms}の移動速度` : null}を追加で獲得します。            
        </p> 
    );
}

export default description;