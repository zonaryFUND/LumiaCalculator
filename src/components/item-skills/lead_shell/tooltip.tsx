import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = _ => (
    <p>
        次に加える基本攻撃が<span className={style.emphasis}>{Constants.dmg.base}</span>の追加スキルダメージを与え、
        {Constants.slow.duration}秒間移動速度を{Constants.slow.effect}%減少させます。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;