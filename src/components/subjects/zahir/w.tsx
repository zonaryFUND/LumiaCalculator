import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：ガンディバ以外のスキルを的中した場合、ザヒルの後ろに{Constants.W.chakram_gain}
        つのチャクラムを獲得します。(最大{Constants.W.charge.max}つ)<br />
        <br />
        チャクラムを1つ消耗して指定した方向へチャクラムを発射し、的中した敵に<Value skill="W" ratio={Constants.W.damage} />
        のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>死神の目の効果</span>：的中した場合、ナーラーヤナーストラとヴァイヴァヤーストラのスキルクー ルダウンが{Constants.W.qe_cooldown_reduction}%減少します。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>ガンディバはチャクラム及び武器がないと使用できません</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base}
    ]
}