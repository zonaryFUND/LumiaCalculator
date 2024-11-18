import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エマは自分が召喚した鳩、帽子、兔を指定してその位置に瞬間移動した後、対象に応じて追加でマジックショーを行います。<br />
            <br />
            <span className={style.level}>鳩</span>：鳩がエマの位置と入れ替わり、経路上の敵に
            <Value skill="R" ratio={Constants.R.Q.damage} />のスキルダメージを与え、
            {Constants.R.Q.bind}秒間束縛させます。<br />
            <br />
            <span className={style.level}>帽子</span>：帽子がエマの位置と入れ替わり、範囲内の敵に
            <Value skill="R" ratio={Constants.R.W.damage} />のスキルダメージを与え、帽子の中心に引っ張ります。<br />
            <br />
            <span className={style.level}>兔</span>：兔周辺の敵にマジックをかけ、
            {Constants.R.E.morph}秒間兔に変身させ、<Value skill="R" ratio={Constants.R.E.damage} />
            のスキルダメージを与えます。
            兔になった対象は移動速度が{Constants.R.E.movement_speed}減少し、エマはCheerUP♥のクールダウンが初期化されます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "鳩のダメージ量", values: Constants.R.Q.damage.base},
        {title: "帽子のダメージ量", values: Constants.R.W.damage.base},
        {title: "ウサギのダメージ量", values: Constants.R.E.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
