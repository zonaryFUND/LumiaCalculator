import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>突撃小銃状態</span>：グレネード弾を発射し、的中した敵に<Damage skill="Q" constants={Constants.Q.outer_damage} {...props} />
            のスキルダメージを与え、中心部に当たった敵には<Damage skill="Q" constants={Constants.Q.center_damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            グレネード弾の弾は最大{Constants.Q.charge.max}発まで装填できます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>グレネードランチャーを使用し、直前まで使用していた武器が解除されます。</>,
    parameters: [
        {title: "40mmグレネード周辺部ダメージ量", values: Constants.Q.outer_damage.base},
        {title: "40mmグレネード中心部ダメージ量", values: Constants.Q.center_damage.base},
        {title: "40mmグレネードチャージ時間", values: Constants.Q.charge.time},
        {title: "サブマシンガン連射ダメージ量", values: Constants.Q2.damage.base},
        {title: "加速ロケットダメージ量", values: Constants.Q3.damage.base}
    ]
}
