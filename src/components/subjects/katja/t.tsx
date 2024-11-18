import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>灰色の死神</span>：カティアが<span className={style.emphasis}>照準射撃</span>または<span className={style.emphasis}>接近禁止</span>スキルを使用すると、弾丸を再装填し、
            {Constants.T.duration}秒以内の次の基本攻撃が<Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えます。<br />
            <br />
            <span className={style.enhance}>ボーナス</span>：カティアがキルに関与した敵実験体の死体を確認すると{Constants.T.credit}クレジットを獲得します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "合計攻撃力", values: Constants.T.damage.attack, percent: true}
    ]
}
