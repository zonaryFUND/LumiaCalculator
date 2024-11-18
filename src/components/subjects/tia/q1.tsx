import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import color from "./color.module.styl";
import { values } from "./q";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが<span className={color.yellow}>黄色</span>絵の具を前方に投げ、爆発した位置から半径{Constants.Q.y.blast_range}m範囲に
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与え、黄色の絵の具を塗ります。黄色の絵の具がついたら
        {Constants.Q.y.slow.duration}秒間敵の移動速度を{Constants.Q.y.slow.effect}%減少させます。
    </>
);

export default q;

export { values };