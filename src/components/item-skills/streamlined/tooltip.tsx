import * as React from "react";
import Constants from "./constants.json";

const description: React.FC = _ => (
    <p>
        {Constants.time_bound}秒以内に{Constants.threshold}回の個別ダメージを与えると、
        {Constants.duration}秒間移動速度が{Constants.ms}％増加します。<br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;