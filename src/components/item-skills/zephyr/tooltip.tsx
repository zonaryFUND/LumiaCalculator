import * as React from "react";
import Constants from "./constants.json";

type Props = {
    values: any
}

const description: React.FC<Props> = props => (
    <p>
        {Constants.time_bound}秒以内に{Constants.threshold}回の個別ダメージを加えると、
        {Constants.duration}秒間移動速度が{Constants.ms}％、攻撃速度が{Constants.as}％増加して
        {Constants.shield.base}のシールドを獲得します。<br/>
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;