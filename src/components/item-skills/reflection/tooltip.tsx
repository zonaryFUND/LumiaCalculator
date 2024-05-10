import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";

type Props = {
    values: any
}

const description: React.FC<Props> = props => (
    <p>
        基本攻撃で受けたダメージの<span className={style.weak}>{props.values.ratio}％</span>を攻撃してきた対象に固定ダメージで返して、
        {Constants["healing-reduction"].duration}秒間{Constants["healing-reduction"].effect}％の治癒減少効果を与えます。<br />
        <br />
        また、{Constants.time_bound}秒間合わせて{Constants.threshold}のダメージを受けた場合には、
        周りに<span className={style.emphasis}>{props.values.dmg.base}</span>のスキルダメージを与えます。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;