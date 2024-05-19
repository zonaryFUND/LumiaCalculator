import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アビゲイルが次元の中に身を潜め、{Constants.R.untargetable}秒間対象指定不可状態になります。<br />
        その後着地しながら敵に<Value skill="R" ratio={Constants.R.damage} />
        のスキルダメージを与え、移動速度を{Constants.R.slow.duration}秒間{Constants.R.slow.effect}%減少させます。<br />
        <br />
        スキルに的中された対象には<span className={style.emphasis}>座標</span>を残します。<br />
        座標は{Constants.R.coordinates}秒間維持され、対象の視界が提供されます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}