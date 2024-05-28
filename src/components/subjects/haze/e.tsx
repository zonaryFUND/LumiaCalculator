import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>サブマシンガンに武器切り替え</span>：前方に短く突進し、{Constants.E.duration}秒間{Constants.E.ammo}発弾倉のサブマシンガンに切り替えます。<br />
            <br />
            サブマシンガン状態では移動しながら敵を攻撃でき、攻撃命令で対象を変更できます。各攻撃は<Damage skill="E" constants={Constants.E.damage} {...props} />
            <span className={style.amp}>(+スキル増幅{Constants.E.damage.amp_per}あたり1)</span>のスキルダメージを与え、
            {Constants.E.effect_count}発目の弾ごとに基本攻撃が的中すると、効果が適用されます。サブマシンガン状態を維持する間、製作や採取など一部の行動が制限され、
            <span className={style.emphasis}>40mmグレネードスキル</span>は<span className={style.emphasis}>サブマシンガン連射</span>スキルに変更されます。<br />
            <br />
            サブマシンガン状態が終了すると、余った弾の数に比例してクールダウンが最大{Constants.E.max_cooldown_reduction}%減少します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは壁を越えられません。<br />
        <span className={style.emphasis}>サブマシンガン</span>を使用し、直前まで使用していた武器が解除されます。<br />
        最初の突進後、最も近い実験体や戦闘状態の野生動物が自動的にターゲティングされます。<br />
        <span className={style.emphasis}>サブマシンガン状態</span>は弾倉がすべて消費されるか、持続時間が終了されるか、他の銃器を使用すると解除されます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}
