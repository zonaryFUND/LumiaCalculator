import { Status } from "components/subject/use-status";
import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";

const q: React.FC<Status> = status => (
    <>
        つばめが手裏剣{Constants.Q.amount}つを指定した位置に投げます。
        手裏剣は経路の最後まで飛んで行くと回転しながら的中した後に<Damage skill="Q" constants={Constants.Q.damage} />の
        スキルダメージを与え、{Constants.Q.slow_duration}秒間移動速度を{Constants.Q.slow}％減少させます。<br />
        <br />
        刻印が刻まれた敵対象には刻印を{Constants.Q.additional_stack}スタック追加で付与します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}