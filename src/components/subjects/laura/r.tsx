import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが阻止不可状態になり、鞭を指定した方向に伸ばします。<br />
            鞭が壁または予告状の<span className={style.emphasis}>ターゲット</span>に衝突するとその位置に突進して、衝突した敵に
            <Value skill="R" ratio={Constants.R.first_damage} />のスキルダメージを与えます。突進中に初めて衝突した敵はラウラによって到着地点まで引きずられていきます。<br />
            阻止不可状態は鞭が壁に衝突しなかったり、ラウラの突進が終わると解除されます。<br />
            ラウラは突進後、目標地点に到着または壁にぶつかると後ろに大きく回って着地します。この時、周りに<Value skill="R" ratio={Constants.R.second_damage} />のスキルダメージを与えて
            {Constants.R.airborne}秒間空中に浮かせます。<br />
            <br />
            予告状の<span className={style.emphasis}>ターゲット</span>に指定された敵実験体に鞭が的中されると、その対象を少し引き寄せます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.first_damage.base},
        {title: "追加ダメージ量", values: Constants.R.second_damage.base},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
