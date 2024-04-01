import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            テレキネシス：エヴァはレベル6から箱、釣り、採集、復活、航空補給箱などを遠距離で操作できます。戦闘中には航空補給箱、隕石、生命の木獲得または実験体や動物のみ遠距離で操作できます。<br />
            <br />
            エヴァは{Constants.T.cooldown.constant}秒ごとに次の基本攻撃の射程距離が{Constants.T.basic_attack_range}増加し、
            <Damage skill="T" constants={Constants.T.damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            非戦闘状態では1秒ごとにバイタルフォース{Constants.T.vitalforce}を獲得します。実験体を倒すと
            {Constants.T.vitalforce_kill}、アシストに関与するとバイタルフォース{Constants.T.vitalforce_assist}
            を獲得します。強化基本攻撃が的中する場合、バイタルフォース{Constants.T.vitalforce_enhanced_attack}を獲得します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化基本攻撃はスキル攻撃とも見なされます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base}
    ]
}
