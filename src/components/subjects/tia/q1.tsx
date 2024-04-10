import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import color from "./color.styl";
import { values } from "./q";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが<span className={color.yellow}>黄色</span>絵の具を前方に投げ、爆発した位置から半径{Constants.Q.y.blast_range}m範囲に
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与え、黄色の絵の具を塗ります。黄色の絵の具がついたら
        {Constants.Q.y.slow.duration}秒間敵の移動速度を{Constants.Q.y.slow.effect}％減少させます。
    </>
);

export default q;

export { values };