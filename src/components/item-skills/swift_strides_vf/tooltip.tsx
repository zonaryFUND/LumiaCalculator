import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import Damage from "../damage";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
        {Constants.distance_per_stack}m移動するたびに[軽い足取り]を最大{Constants.max_stack}スタックまで獲得できます。<br />
        スタック数に応じて固有移動速度を最大{Constants.ms}まで獲得します。基本攻撃ダメージを与える場合、スタックをすべて消費して最大<Damage {...props} values={props.values.dmg} />のスキルダメージを与えます。
        最大スタック状態ではダメージを受けた対象の移動速度を{props.values.slow.duration}秒間{props.values.slow.effect}％減少させます。<br />
        <br />
        <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はサイドワインダーの<span className={style.strong}>軽い足取り</span>のみ発動します。
    </p> 
);

export default description;