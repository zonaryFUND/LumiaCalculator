import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レノックスが鞭をX字型に素早く2回振って、それぞれ<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、
            {Constants.R.duration[props.config.skillLevels.R]}秒間青い蛇の効果を与えます。<br />
            <br />
            <span className={style.enhance}>青い蛇</span>：移動距離に応じて{Constants.R.tick}秒間{Constants.R.move_damage[props.config.skillLevels.R]}
            の固定ダメージを与えます。2回とも的中した場合には移動距離に比例して{Constants.R.enhanced_move_damage[props.config.skillLevels.R]}の固定ダメージを与えます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "固定ダメージ量", values: Constants.R.move_damage},
        {title: "強化された固定固定ダメージ量", values: Constants.R.enhanced_move_damage},
        {title: "維持時間", values: Constants.R.duration},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
