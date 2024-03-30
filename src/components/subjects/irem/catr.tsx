import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const iremr: React.FC<SubjectSkillProps> = props => (
    <>
        ネコがイレムに変身します。<br />
        <br />
        ネコに変身したイレムは＜お魚＞に移動するとシールドを獲得します。<br />
        シールドは{Constants.CatR.shield_duration}秒間維持され、<Damage skill="R" constants={Constants.CatR.shield} {...props} />のダメージを吸収します。
    </>
);

export default iremr;

export const values: ValuesProps = {
    additionalInfo: <>イレム登場～はアイテムのクールダウン減少効果の影響を受けません。<br />ネコ状態のイレムは投げ武器を使用するため、基本攻撃は遠距離攻撃と見なされます。</>,
    parameters: [
        {title: "シールド吸収量", values: Constants.CatR.shield.base}
    ]
}