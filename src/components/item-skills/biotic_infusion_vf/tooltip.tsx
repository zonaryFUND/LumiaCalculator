import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Value from "../value";
import { useValueContextOptional } from "components/tooltip/value-context";

const description: React.FC<ItemSkillProps> = props => {
    const { status, config, showEquation } = useValueContextOptional();
    const damage = (() => {
        if (status == undefined || config == undefined || showEquation) return null;
        return <Value ratio={props.values.dmg} overrideExpression={{result: {className: style.level}}} />;
    })();

    return (
        <p>
            <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
            スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内の基本攻撃が{damage ? <>{damage}の</> : null}追加スキルダメージを与えます。
            (クールダウン{Constants.cooldown}秒)<br />
            {damage ? null : <><span className={style.level}>キャラクターレベル * {props.values.dmg.level}</span>に値するダメージを与えます。<br /></>}
            <br />
            <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はデスアダーの<span className={style.strong}>意念</span>のみ発動します。
        </p> 
    );
}

export default description;