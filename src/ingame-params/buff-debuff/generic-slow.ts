import { BuffDebuffDefinition } from "./type";
import { CommonPercentLabels } from "./util";

/**
 * 移動速度減少（スロウ）の汎用デバフ（`origin: "generic"`）。スロウを与えるスキル・アビリティは非常に
 * 多いため、発生源ごとに個別のカタログエントリを作らず、「追加できるデバフ一覧」にこの1エントリだけを表示し、
 * 追加後にプルダウンで効果量（%）を選ぶ形式にする。実際にどの発生源が何%のスロウを持つかは、この計算とは
 * 無関係の参照専用「辞書」（`SlowSourceInfo`・`slow-dictionary.ts`）側で別途保持する。
 *
 * `stack`は5%刻みの段階（0..20）そのもので、効果量は`stack * 5`%。実際のスロウ効果は5%の倍数でないことも
 * ありうるが、1%単位で厳密に扱う需要はないと判断し5%刻みに固定した
 */
export const GenericSlowDebuff: Record<string, BuffDebuffDefinition> = {
    "generic.slow": {
        origin: "generic",
        nameIntlID: "generic.slow",
        maxStack: 20,
        stackLabels: CommonPercentLabels(100, 5),
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "generic.slow",
                value: {
                    type: "constant",
                    value: stack * -5
                }
            }]
        })
    }
};
