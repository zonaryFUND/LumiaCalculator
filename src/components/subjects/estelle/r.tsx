import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.enhance}>自分に使用</span>：自分に<Damage skill="R" constants={Constants.R.self.shield} {...props} />
        に値するシールドを{Constants.R.self.duration}秒間付与し、ヘリコプター支援要請をします。ヘリコプターは{Constants.R.self.channel}
        秒後にエステルの位置を補足し、水爆弾を爆発させて範囲内の敵に<Damage skill="R" constants={Constants.R.self.damage} {...props} />
        に値するスキルダメージを与え、敵の移動速度を{Constants.R.self.slow.duration}秒間{Constants.R.self.slow.effect}％減少させます。<br />
        <br />
        <span className={style.enhance}>味方に使用</span>：エステルが味方に<Damage skill="R" constants={Constants.R.ally.shield} {...props} />
        に値するシールドを{Constants.R.ally.duration}秒間付与し、ヘリコプターを呼び出して{Constants.R.ally.channel}
        秒後に味方の位置に素早く移動して半径{Constants.R.ally.range}m以内の敵に
        <Damage skill="R" constants={Constants.R.ally.damage} {...props} />に値するスキルダメージを与え、
        {Constants.R.ally.airborne}秒間敵を空中に浮かせます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "[自分]ダメージ量", values: Constants.R.self.damage.base},
        {title: "[自分]シールド", values: Constants.R.self.shield.base},
        {title: "[味方]ダメージ量", values: Constants.R.ally.damage.base},
        {title: "[味方]シールド", values: Constants.R.ally.shield.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}