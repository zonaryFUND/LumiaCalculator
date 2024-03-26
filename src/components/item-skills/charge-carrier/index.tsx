import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

const Value: React.FC = _ => (
    <span className={style.level}>キャラクターレベル * {Constants.ms_per_level}％</span>
)

const description: React.FC = _ => (
    <p>
        {Constants.time_bound}秒以内に{Constants.threshold}回の個別ダメージを加えると、 
        {Constants.duration}秒間移動速度が<Value />増加して{Constants.shield}のシールドを獲得します。
        <br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;