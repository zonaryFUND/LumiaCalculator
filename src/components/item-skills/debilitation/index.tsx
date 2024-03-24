import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

const Value: React.FC = _ => (
    <span className={style.maxhp}>
        対象の最大体力の{Constants.dmg.enemyMaxHPBase}<span className={style.amp}>(+スキル増幅の{Constants.dmg.amp}％)</span>％
    </span>
)

const description: React.FC = _ => (
    <p>
        スキル攻撃を的中した場合、敵に毎秒<Value />のスキルダメージを与えるデバフ効果を{Constants.duration}秒間付与します。
        (最大{Constants.max_stack}スタック)
    </p> 
);

export default description;