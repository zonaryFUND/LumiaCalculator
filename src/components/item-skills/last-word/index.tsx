import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

const Value: React.FC = _ => (
    <>
        <span className={style.amp}>+スキル増幅の{Constants.ad.amp}％</span>
        <span className={style.maxhp}>+敵最大体力の{Constants.ad.enemyMaxHP}％</span>
    </>
)

const description: React.FC = _ => (
    <p>
        最後の弾丸で加える基本攻撃が攻撃力が<Value />に値する追加スキルダメージを与え、
        与えたダメージの<span className={style.emphasis}>{Constants.lifesteal_ratio}％</span>を体力に回復します。
    </p> 
);

export default description;