import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>：エキオンが攻撃スキルを使用すると、VFゲージが増加して、VFゲージ1あたり
        {Constants.R.damage_amp_per_vf[props.skillLevel]}%スキルのダメージ量が増加します。<br />
        <br />
        <span className={style.emphasis}>VF暴走</span>：ゲージをフルチャージすると{Constants.R.overflow}
        秒間暴走状態になり毒蛇の刃(Q)、竜鱗(W)スキルが使用できない代わりに移動速度が{Constants.R.movement_speed}%増加します。また、周りの敵に
        {Constants.R.area_damage_tick}秒ごとに<Value skill="R" ratio={Constants.R.area_damage} />
        の固定ダメージを与え、エンベノミゼーション(R)スキルが使用でき、ドライバイト(E)のクールダウンが初期化されます。<br />
        VF暴走状態で敵を倒した場合、暴走持続時間が{Constants.R.kill_extend}秒延長されます。<br />
        <br />
        <span className={style.emphasis}>オーバーロード</span>：暴走が終わると{Constants.R.overload}
        秒間オーバーロード状態になり、基本攻撃の射程距離が{Constants.R.range_penalty}減少し、ゲージが増加しません。<br />
    </>
);

export default r;
