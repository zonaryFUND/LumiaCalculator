import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

const Value: React.FC = _ => (
    <>{Constants.damage.base} + <span className={style.level}>キャラクターレベル * {Constants.damage.perLevel}</span></>
)

const description: React.FC = _  => (
    <p>
        敵実験体に{Constants.threshold}回連続で基本攻撃を与えると<Value />の追加スキルダメージを与えます。
        <br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;