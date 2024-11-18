import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エレナが基本攻撃またはスキルで敵を攻撃すると<span className={style.emphasis}>氷床地帯</span>
            を生成し、その上の敵に<span className={style.emphasis}>冷気</span>効果を与えます。エレナがスキルで敵にダメージを与えると、対象の
            <span className={style.emphasis}>冷気</span>が{Constants.T.chill}増加します。<span className={style.emphasis}>冷気</span>
            が少しずつ貯まる間、敵は移動速度が{Constants.T.slow}%減少し、冷気が{Constants.T.frozen}まで貯まった場合、敵は{Constants.T.stun}
            秒間気絶し、<span className={style.emphasis}>氷結</span>状態になります。<br />
            <br />
            <span className={style.emphasis}>氷結</span>：エレナまたはエレナの味方から攻撃されると
            <Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを受けて<span className={style.emphasis}>氷結</span>状態が解除されます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
