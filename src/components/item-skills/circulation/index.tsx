import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    const dmgs = [props.values.dmg.melee, props.values.dmg.ranged].map(obj => `${obj.base}(+スキル増幅の${obj.amp}％)`);
    return <>（<span className={style.amp}>近距離：{dmgs[0]}</span> | <span className={style.amp}>遠距離：{dmgs[1]}</span>）</>;
}

const description: React.FC<Props> = props => (
    <p>
        基本攻撃が敵実験体に命中すると、<Value {...props} />のスキルダメージを与え、
        {Constants.duration}秒間情熱スタックを獲得して、{props.values.as}％の攻撃速度を獲得します。
    </p> 
);

export default description;