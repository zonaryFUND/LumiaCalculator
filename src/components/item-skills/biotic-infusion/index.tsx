import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    function elem(obj: any): React.ReactElement | null {
        return (
            obj.enemyMaxHP ? <span className={style.maxhp}>敵の最大体力の{obj.enemyMaxHP}％</span> :
            obj.amp ? <span className={style.amp}>スキル増幅の{obj.amp}％</span> :
            obj.perLevel ? <>{obj.base}<span className={style.level}>(+キャラクターレベル * {obj.perLevel})</span></> :
            null    
        );
    }

    if (props.values.dmg.melee != undefined) {
        return (
            <>(近距離：{elem(props.values.dmg.melee)} | 遠距離：{elem(props.values.dmg.ranged)})</>
        )
    } else {
        return elem(props.values.dmg);
    }
};

const description: React.FC<Props> = props => (
    <p>
        スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内に行われる基本攻撃は
        <Value {...props} />の追加スキルダメージを与えます。(クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;