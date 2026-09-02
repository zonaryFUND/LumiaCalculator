import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import Decimal from "decimal.js";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 解放(R) ダメージを与えた後、数秒間パッシブ（苦痛の記憶）の体力減少比例スキル増幅効果が100%増加する。
    // この増幅値はperpetual-status.tsのAdditional()が現在体力割合（currentHPRatio）から算出するが、
    // 自己バフ側（(config, status)のみ受け取る）は現在体力割合を扱えないため、Additional()を再計算する
    // のではなく、statusForSelfBuffs（自己バフ適用前のStatus、perpetual_statusは既に反映済み）の
    // status.skillAmp.componentsから既に計算済みのTコンポーネントの値をそのまま読み出し、同額をもう一度
    // 加算することで「Tの増幅分だけを2倍にする」効果を、現在体力割合を扱わずに再現する
    // （体力回復側は標準の体力再生とは別扱いのため対象外、ユーザー確認済み）
    const tAmpComponent = status.skillAmp.components.find(c => c.origin == "perpetual_status");
    const tAmpValue = tAmpComponent?.value.value ?? 0;

    return {
        // ウィルソン、どこ？(W) 発動中の自己移動速度増加
        "subject.sissela.w-movement-speed": {
            origin: "skill",
            nameIntlID: "subject.sissela.w-movement-speed",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1015300",
                    value: {
                        type: "constant",
                        value: Constants.W.movement_speed * stack
                    }
                }]
            })
        },
        // 解放(R) 発動後、苦痛の記憶(T)の体力減少比例スキル増幅効果を100%増加
        "subject.sissela.r-amp-enhance": {
            origin: "skill",
            nameIntlID: "subject.sissela.r-amp-enhance",
            maxStack: 1,
            buff: stack => ({
                skillAmp: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1015500",
                    value: {
                        type: "constant",
                        value: new Decimal(tAmpValue).mul(Constants.R.passive_enhance).div(100).mul(stack)
                    }
                }]
            })
        }
    };
};

// 苦痛の記憶(T)の追加攻撃的中時移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.sissela.t-slow", values: Constants.T.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) }
];
