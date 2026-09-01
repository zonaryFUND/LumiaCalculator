import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // CheerUP♥(T) 自己攻撃速度増加
    "subject.emma.t-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.emma.t-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1019100",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * stack
                }
            }]
        })
    }
});

// E（変身マジック）・R（ウサギE）の移動速度減少は、一般的な移動速度減少（％、汎用デバフとして
// generic-slow.tsに一本化）とは異なり、移動速度を定数値（Constants.E.movement_speed=1.3、
// Constants.R.E.movement_speed=1.6）で直接減算する特殊な計算式（おそらく「定数移動速度の合計に、
// バフ以外の％移動速度上昇を適用した後、この定数値を減算する」）を持つと推測される。この計算式専用の
// ロジックをcombine-components.tsに追加するコストに対し、この効果を持つのがエマE/Rのみである
// （移動速度減少効果全体における重要度が低い）ことを踏まえ、デバフ定義は行わず、このコメントのみ残す
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.emma.q-slow", values: [Constants.Q.slow.effect] }
];
