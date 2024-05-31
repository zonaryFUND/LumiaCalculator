import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.level}>持続効果</span>：ルクが攻撃または対象を倒す時、ミニマップにピングが発生しません。<br />
            <br />
            使用効果：ルクが指定した敵と味方、自分が設置したカメラの後ろに即時移動して拳銃で<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えてキャストを妨害し、
            {Constants.E.slow.duration}秒間移動速度を{Constants.E.slow.effect}%減少させます。味方や自分が設置したカメラに使用した場合、スキルの射程距離が増加し、使用したカメラは破壊されます。<br />
            <br />
            <span className={style.strong}>進化効果</span>：敵実験体を倒す時に関与した場合、無騒音掃除機のクールダウンが初期化されます。
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
