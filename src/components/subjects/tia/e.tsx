import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

type Props = SubjectSkillProps & {
    color: React.ReactElement
}

const e: React.FC<Props> = props => (
    <>
        ティアが地面を{props.color}の絵の具で塗りながら突進し、衝突した敵に<Damage skill="E" constants={Constants.E.damage} {...props} />
        のスキルダメージを与え{props.color}の絵の具を塗ります。
    </>
)

export default e;

export const values: ValuesProps = {
    additionalInfo: <>
        カラーリング(E)共通効果：スキルを使用すると自動的に次の色に変わります。<br />
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown.constant},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}