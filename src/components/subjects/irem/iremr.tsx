import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const iremr: React.FC<SubjectSkillProps> = props => (
    <>
        イレムがネコに変身します。<br />
        <br />
        イレムが<span className={style.emphasis}>バウンシングボール</span>や
        <span className={style.emphasis}>こっちだよ～</span>で＜お魚＞を生成すると、次の基本攻撃の射程距離が増加し、
        <Value skill="R" ratio={Constants.IremR.damage} />のスキルダメージを与えます。また、
        {Constants.IremR.bell}秒間維持されるネコの鈴を付けさせます。<br />
        ネコの鈴が付けられた対象はイレムに視界を共有されます。<br />
        ＜お魚＞は{Constants.common.fish}秒間維持され、最大{Constants.common.fish_max}まで生成できます。
    </>
);

export default iremr;

export const values: ValuesProps = {
    additionalInfo: <>ネコ変身！はアイテムのクールダウン減少効果の影響を受けません。<br />イレムの基本攻撃の射程距離は他の投げ武器を使用する実験体より{Constants.IremR.range_penalty}短いです。</>,
    parameters: [
        {title: "スキル増幅量", values: Constants.IremR.damage.amp},
        {title: "ダメージ量", values: Constants.IremR.damage.base}
    ]
}