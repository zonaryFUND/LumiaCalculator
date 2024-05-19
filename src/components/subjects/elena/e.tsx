import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：エレナは1秒ごとに{Constants.E.stepsequence_recovery}の
            <span className={style.emphasis}>ステップシークエンス</span>を回復します。氷床地帯では1秒ごとに{Constants.E.stepsequence_recovery_on_ice}
            の<span className={style.emphasis}>ステップシークエンス</span>を回復します。<br />
            <br />
            エレナは1秒ごとに{Constants.E.stepsequence_cost}の<span className={style.emphasis}>ステップシークエンス</span>
            を消耗して指定した方向にスケートで移動しながら経路上の敵に<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base}
    ]
}
