import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    const dmgs = [props.values.dmg.melee, props.values.dmg.ranged].map(obj => (
        <>
            <span className={style.maxhp}>敵の最大体力の{obj.enemyMaxHP}％</span> + 
            <span className={style.level}>{obj.levelProp.from}~{obj.levelProp.to}(キャラクターレベル比例)</span>
        </>
    ));
    return <>（近距離：{dmgs[0]} | 遠距離：{dmgs[1]}）</>;
}

const description: React.FC<Props> = props => (
    <p>
        基本攻撃するたびに{Constants.duration}秒間電撃をチャージします。(最大{Constants.max_stack}回)<br />
        最大チャージ状態で基本攻撃したり、シールドのある対象を基本攻撃すると、<Value {...props} />の追加スキルダメージを与え、
        すべての電撃のチャージ量を失います。
    </p> 
);

export default description;