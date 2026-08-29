import Decimal from "decimal.js";
import { Status } from "core/subject-dynamic/status/type";

/**
 * 仮想敵に対するダメージ軽減の内訳
 */
export type Mitigation = {
    defense: {
        base: Decimal
        penetration: Decimal
        summonedPenetration?: Decimal
    }
    defenseMitigation: {
        basic: Decimal
        summoned?: Decimal
    }

    basicAttackMitigation: {
        labelIntlID: string
        mitigationType: "ratio" | "constant"
        value: Decimal
    }[]

    skillMitigation: {
        labelIntlID: string
        value: Decimal
    }[]
}

function defenseMitigationPercentage(rawDefense: Decimal, penetration: Decimal): Decimal {
    const adjustedDefense = rawDefense.sub(penetration).clamp(0, rawDefense);
    return adjustedDefense.dividedBy(adjustedDefense.add(100)).times(100);
}

/**
 * 発生源・仮想敵のステータスから軽減の内訳を算出する
 *
 * @param status 発生源のステータス
 * @param targetStatus 仮想敵のステータス
 */
export function createMitigation(status: Status, targetStatus: Status): Mitigation {
    const targetDefense = targetStatus.defense.calculatedValue;

    const penetration = status.penetrationDefense.calculatedValue
        .add(targetDefense.percent(status.penetrationDefenseRatio.calculatedValue).floor())

    const summonedPenetration = status.summoned ? status.summoned[0].status.armorPenetration.add(
        targetDefense.percent(status.summoned[0].status.armorPenetrationRatio).floor()
    ) : undefined;

    const defenseMitigation = {
        basic: defenseMitigationPercentage(targetDefense, penetration),
        summoned: summonedPenetration ? defenseMitigationPercentage(targetDefense, summonedPenetration) : undefined
    };

    const basicAttackMitigation = [
        {
            labelIntlID: "app.mitigation.defense-mastery",
            mitigationType: "ratio",
            value: targetStatus.preventBasicAttackDamagedRatio.calculatedValue
        },
        targetStatus.preventBasicAttackDamaged.calculatedValue.greaterThan(0) ?
        {
            labelIntlID: "aaaa",
            mitigationType: "constant",
            value: targetStatus.preventBasicAttackDamaged.calculatedValue
        } : undefined
    ].filter((e): e is {
        labelIntlID: string
        mitigationType: "ratio" | "constant"
        value: Decimal
    } => e != undefined);

    const skillMitigation = [{
        labelIntlID: "app.mitigation.defense-mastery",
        value: targetStatus.preventSkillDamagedRatio.calculatedValue
    }];

    return {
        defense: {
            base: targetDefense,
            penetration,
            summonedPenetration
        },
        defenseMitigation,
        basicAttackMitigation,
        skillMitigation
    };
}

/**
 * 軽減の内訳のうち、表示用の1行分の情報
 */
export type MitigationInfo = {
    labelIntlID: string
    value: Decimal
    base: Decimal
    mitigated: Decimal
    subtractionCount?: number
}

/**
 * 威力・軽減内訳から軽減後の最終ダメージを算出する
 *
 * @param potency 軽減前の威力
 * @param mitigation `createMitigation()`で算出した軽減の内訳
 * @param type 基本攻撃ダメージかスキルダメージか
 * @param fromSummoned 召喚体から発生したダメージかどうか
 * @param hitCount 複数回ヒットする攻撃の場合のヒット数（固定値軽減の減算回数に使う）
 */
export function mitigatedDamage(potency: Decimal, mitigation: Mitigation, type: "basic" | "skill", fromSummoned: boolean, hitCount?: number): [Decimal, MitigationInfo[]] {
    const defenseMitigation = fromSummoned ? mitigation.defenseMitigation.summoned! : mitigation.defenseMitigation.basic;
    const defenseInfo: MitigationInfo = {
        labelIntlID: "app.mitigation.defense",
        value: defenseMitigation.floor(),
        base: potency,
        mitigated: potency.percent(defenseMitigation).floor()
    }

    const base = potency.subPercent(defenseMitigation).floor();

    const additionalMitigation = type == "basic" ? mitigation.basicAttackMitigation : mitigation.skillMitigation;
    const [additionalRatio, additionalConstant, info] = additionalMitigation.reduce((prev, current) => {
        const subtraction = ("mitigationType" in current && current.mitigationType == "constant");
        return [
            subtraction ? prev[0] : prev[0].add(current.value),
            subtraction ? prev[1].add(current.value.mul(hitCount || 1)) : prev[1],
            prev[2].concat({
                ...current,
                base,
                mitigated:
                    subtraction ?
                    base.sub(current.value.mul(hitCount || 1)) :
                    base.percent(current.value).floor(),
                subtractionCount: subtraction ? (hitCount || 1) : undefined
            })
        ]
    }, [new Decimal(0), new Decimal(0), [defenseInfo]] as [Decimal, Decimal, MitigationInfo[]])

    return [base.subPercent(additionalRatio).sub(additionalConstant), info];
}
