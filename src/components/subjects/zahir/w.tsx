import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：ガンディバ以外のスキルを的中した場合、ザヒルの後ろに{Constants.W.chakram_gain}
        つのチャクラムを獲得します。(最大{Constants.W.chakram_max}つ)チャクラムは{Constants.W.chakram_duration}
        秒間維持され、チャクラムを獲得する度に維持時間が初期化されます。<br />
        <br />
        チャクラムを1つ消耗して指定した方向へチャクラムを発射し、的中した敵に<Damage skill="W" constants={Constants.W.damage} {...props}/>
        のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>死神の目の効果</span>：的中した場合、ナーラーヤナーストラとヴァイヴァヤーストラのスキルクー ルダウンが{Constants.W.qe_cooldown_reduction}％減少します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base}
    ]
}