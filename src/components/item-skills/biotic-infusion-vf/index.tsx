import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => (
    <span className={style.level}>キャラクターレベル * {props.values.dmg.perLevel}</span>
)

const description: React.FC<Props> = props => (
    <p>
        <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
        スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内の基本攻撃が追加スキルダメージを与えます。
        (クールダウン{Constants.cooldown}秒)<br />
        <Value {...props} />に値するダメージを与えます。<br />
        <br />
        <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はデスアダーの<span className={style.strong}>意念</span>のみ発動します。
    </p> 
);

export default description;