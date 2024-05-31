import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";

const Value: React.FC<ItemSkillProps> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    if (config && status && !showEquation) {
        return (
            <>
                <span className={style.level}>{config.level * props.values.dmg.level}</span>
                {props.values.dmg.amp ? <span className={style.amp}>(+{status.skillAmp.calculatedValue.percent(props.values.dmg.amp).toString()})</span> : null}
            </>
        )
    } else {
        return (
            <>
                <span className={style.level}>キャラクターレベル * {props.values.dmg.level}</span>
                {props.values.dmg.amp ? <span className={style.amp}>(+スキル増幅の{props.values.dmg.amp}%)</span> : null}
            </>
        )        
    }
};

const description: React.FC<ItemSkillProps> = props => (
    <p>
        次に与える基本攻撃が{props.values.dmg ? <><Value {...props} />の追加スキルダメージを与え、</> : null}
        {props.values.slow.duration}秒間移動速度を{props.values.slow.effect}%減少させます。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;