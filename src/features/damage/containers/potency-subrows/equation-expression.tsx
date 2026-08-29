import { ValueRatio } from "core/value-ratio";
import * as React from "react";
import EquationUnit from "../../components/potency-subrows/equation-unit";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";

/**
 * スキル威力計算式の各要素を結合するとき、「単に前項と+で結合する」か「前項までを()で括ってからxで結合する」のかを返す。
 * 
 * ほとんどは前者だが、後者は基本攻撃増幅の計算などに用いることがある。
 * 
 * なお、後者の場合でも、前項までの項目数が1以下であれば()で括る処理は行わない。
 * 
 */
export function joinEquationStrategy(key: keyof ValueRatio): "add" | "multiply" {
    switch (key) {
        case "base":
        case "level":
        case "stack":
        case "gauge":
        case "maxHP":
        case "additionalMaxHP":
        case "defense":
        case "attack":
        case "additionalAttack":
        case "additionalAttackSpeed":
        case "amp":
            return "add";

        case "basicAttackAmp":
        case "criticalChance":
            return "multiply";

        // 対象最大体力などのこの項目では計算式に追加されない要素は単に無視されるが、
        // エラーにはしないのでaddで返す
        default:
            return "add";
    }
}

/**
 * スキル威力値の詳細計算式を表示する行において、各レシオ値に応じた計算式断片を構成する
 *
 * たとえば、レベルレシオは単にレベルとの掛け算だが、攻撃力レシオは百分率で表記される
 *
 * Reactコンポーネントではなくプレーンな関数として提供している。呼び出し元
 * （`static-value-equation.tsx`）は、この関数がnullを返すキー（例：武器未装備時のbasicAttackAmp）を
 * 結合式から除外する必要があるが、`<EquationExpression .../>`とJSXで包んでしまうと要素自体は常に非nullに
 * なってしまい、実際にnullを返すかどうかを呼び出し元がレンダリング前に判定できなくなるため
 */
export default function equationExpressionOf(
    config: SubjectConfig,
    status: Status,
    key: keyof ValueRatio,
    ratioElement: React.ReactElement
): React.ReactElement | null {
    switch (key) {
        // 基礎値はそのまま表示
        case "base":
            return ratioElement;

        // レベル、固有スタック、固有ゲージは百分率なしの掛け算表記
        case "level":
            return <EquationUnit labelIntlID="레벨" ratio={ratioElement} currentValue={config.level} />;
        case "stack":
            return <EquationUnit labelIntlID="app.stack" ratio={ratioElement} currentValue={config.stack} />;
        case "gauge":
            return <EquationUnit labelIntlID="app.gauge" ratio={ratioElement} currentValue={config.gauge} />;

        // 最大体力、追加最大体力、攻撃力、追加攻撃力、攻撃速度、スキル増幅、致命打確率は百分率で表示
        case "maxHP":
            return <EquationUnit labelIntlID="StatType/MaxHp" ratio={ratioElement} currentValue={status.maxHp.calculatedValue} percent  />;
        case "additionalMaxHP":
            return <EquationUnit labelIntlID="StatType/AddedHpAmount" ratio={ratioElement} currentValue={status.maxHp.additionalValue} percent />;
        case "defense":
            return <EquationUnit labelIntlID="StatType/Defense" ratio={ratioElement} currentValue={status.defense.calculatedValue} percent />;
        case "attack":
            return <EquationUnit labelIntlID="StatType/AttackPower" ratio={ratioElement} currentValue={status.attackPower.calculatedValue} percent />;
        case "additionalAttack":
            return <EquationUnit labelIntlID="ToolTipType/AddAttackPower" ratio={ratioElement} currentValue={status.attackPower.additionalValue} percent />;
        case "additionalAttackSpeed":
            return <EquationUnit labelIntlID="ToolTipType/AddAttackSpeedRatio" ratio={ratioElement} currentValue={status.attackSpeed.additionalValue} percent />;
        case "amp":
            return <EquationUnit labelIntlID="StatType/IncreaseSkillDamageRatio" ratio={ratioElement} currentValue={status.skillAmp.calculatedValue} percent />;
        case "criticalChance":
            return <>(<EquationUnit labelIntlID="StatType/CriticalStrikeChance" ratio={ratioElement} currentValue={status.criticalStrikeChance.calculatedValue} percent />)</>;
        // 基本攻撃増幅は（正の数であれば）+1で計算され、この項目が単独で（）で括られる。
        // 「基本攻撃増幅のx%」という表記は存在せず、このレシオが存在する場合は必ず100%（1倍）。
        // 0の場合、「攻撃力型の実験体だが、有効な武器を装備していない」ことを意味する。この項目をnullで返し、呼び出し元でフィルタする。
        case "basicAttackAmp":
            if (status.increaseBasicAttackDamageRatio.calculatedValue.greaterThan(0)) {
                return <>(<span className={table.small}><FormattedMessage id="StatType/IncreaseBasicAttackDamageRatio" /></span>{status.increaseBasicAttackDamageRatio.calculatedValue.toString()}% + 1)</>;
            } else {
                return null;
            }
    }

    return null;
}