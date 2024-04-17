import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        夢を導く蝶を出して<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。蝶は敵に的中または蝶道の最後まで飛んで行った場合、スキルを使用した位置に戻りながら再びダメージを与えます。<br />
        <br />
        戻ってくる蝶を回収するとクールダウン<span className={style.emphasis}>{Constants.Q.cooldown_reduction}％</span>が返され、敵に的中した蝶の場合、ヴァーニャに
        <span className={style.emphasis}>夢幻の蝶</span>のシールドを付与します。
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <><span className={style.emphasis}>追飛</span>を使用する場合、蝶の回収範囲が広くなります。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}