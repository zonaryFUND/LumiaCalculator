import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    return (
        <>{props.values.dmg.base}+<span className={style.amp}>スキル増幅の{props.values.dmg.amp}％</span></>
    )
};

const description: React.FC<Props> = props => (
    <p>
        スキル攻撃を加えると敵が{Constants.duration}秒間呪いの状態になります。
        呪い状態の敵は呪いの状態から解除される時、<Value {...props} />に値する固定ダメージを受けます。
        一度呪い状態になると{Constants.immune}秒間(基本攻撃を受けると{Constants.immuneReduction}秒減少)再び呪い状態になりません。(クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;