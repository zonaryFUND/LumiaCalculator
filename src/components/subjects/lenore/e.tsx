import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノアが範囲内の敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えながら敵を中央に引き寄せます。<br />
            <br />
            <span className={style.emphasis}>強化効果：</span>中央に引き寄せられた敵の移動速度を
            {Constants.E.enhance_slow.duration}秒間{Constants.E.enhance_slow.effect}%減少させます。減少した移動速度は一定時間にわたって徐々に回復します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
