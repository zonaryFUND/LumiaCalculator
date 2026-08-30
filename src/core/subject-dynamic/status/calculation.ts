import { BaseStatus, BaseStatusType, LevelUpStatus, LevelUpStatusType, WeaponMasteryStatus } from "core/subject-static";
import { adaptiveForceTargetOf, SubjectConfig, weaponTypeIDOf } from "../config";
import { ComponentStatus, ComponentStatusValue, Status } from "./type";
import { StatusValue } from "./value-component/type";
import { DavidChestArmorUpgradeDictionary, EquipmentBaseStatus, EquipmentStatusDictionary } from "core/equipment";
import Decimal from "decimal.js";
import { WeaponTypeStatus } from "core/equipment/weapon";
import { createComponentValue, StatusValueComponent } from "./value-component/component";
import { BaseBasicAttackRange, BaseVision, BasicAttackReductionPerMastery, MovementSpeedPerMastery, SkillReductionPerMastery } from "./standard-values";
import { calculateCooldownValue, calculateDefenseValue, calculateMovementSpeedValue, calculateStatusValue } from "./combine-components";
import * as es from "es-toolkit";
import { SubjectPerpetualStatusDictionary, SubjectSummonInfoDictionary } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityPerpetualStatusDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { IncomingBuffDebuffCatalog } from "@app/ingame-params/buff-debuff/incoming-catalog";
import { selfBuffDefinitionsOf } from "@app/ingame-params/buff-debuff/self-buff-definitions";

/**
 * 各発生源から返された`Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>`を、
 * ベースとなる`ComponentStatus`へ順に畳み込む
 */
function foldComponentStatus(base: ComponentStatus, sources: Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>[]): ComponentStatus {
    return sources.reduce((prev, dict) => {
        return Object.entries(dict).reduce((prev, [key, components]) => {
            const prevComponent = (prev[key as keyof ComponentStatus] as ComponentStatusValue ?? []);
            return {
                ...prev,
                [key]: {
                    ...prevComponent,
                    components: [...prevComponent.components, ...(components ?? [])]
                } satisfies ComponentStatusValue
            }
        }, prev);
    }, base);
}

/**
 * 実験体設定および現在のHPから現在ステータスを計算する
 * @param config 実験体設定
 * @param currentHPRatio 最大HPに対する現在のHPの割合（％）
 * @returns
 */
export function statusOf(config: SubjectConfig, currentHPRatio: number): Status {
    const level1Status = BaseStatus[config.subject];
    const levelupStatus = LevelUpStatus[config.subject];
    const equipmentStatus = Object.entries(config.equipment)
        .flatMap(([position, equipmentID]) => {
            if (equipmentID == null || typeof equipmentID != "number") {
                return []
            }

            const status = EquipmentStatusDictionary[equipmentID];
            const upgrade = DavidChestArmorUpgradeDictionary[equipmentID];
            if (position == "Chest" && config.equipment.isChestDavid && upgrade != undefined) {
                const upgrade = DavidChestArmorUpgradeDictionary[equipmentID];
                return Object.entries(upgrade).reduce((prev, [statusKey, value]) => {
                    return {
                        ...prev,
                        [statusKey]: (prev[statusKey as keyof EquipmentBaseStatus] ?? new Decimal(0)).add(value)
                    }
                }, status);
            } else {
                return status;
            }
        });

    const sumOfEquipmentStatus = (statusKey: keyof EquipmentBaseStatus): Decimal | undefined =>
        equipmentStatus
            .map(s => s[statusKey])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => (prev ?? new Decimal(0)).add(current), undefined as Decimal | undefined);

    const maxOfEquipmentStatus = (statusKey: keyof EquipmentBaseStatus): Decimal | undefined =>
        equipmentStatus
            .map(s => s[statusKey])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => Decimal.max(prev ?? 0, current), undefined as Decimal | undefined);

    const [weaponType, weaponBaseStatus] = (() => {
        const type = weaponTypeIDOf(config);
        if (type == undefined) return [undefined, undefined];
        return [type, WeaponTypeStatus[type]];
    })();

    const weaponMasteryStatus = weaponType == undefined ? undefined : WeaponMasteryStatus[config.subject][weaponType];

    const adaptiveForceTarget = adaptiveForceTargetOf(config);

    const statusComponent = (
        calculationType: StatusValueComponent["calculationType"],
        key: keyof BaseStatusType | keyof LevelUpStatusType
    ): StatusValueComponent | undefined => {
        
        const value = createComponentValue(
            config.level, 
            true, 
            {
                base: level1Status[key], 
                levelProportional: key != "moveSpeed" && key != "attackSpeed" ? levelupStatus[key] : undefined
            }
        );

        if (!value) return undefined;
        return { origin: "subject-status", calculationType, value };
    };

    const equipmentComponent = (
        calculationType: StatusValueComponent["calculationType"],
        values: {
            base?: Decimal,
            levelProportional?: Decimal
        }
    ): StatusValueComponent | undefined => {
        const value = createComponentValue(config.level, false, values);

        if (!value) return undefined;
        return { origin: "equipment", calculationType, value };
    };

    const masteryComponent = (
        calculationType: "sum" | "mul",
        mastery: Decimal.Value,
        multiplier: Decimal.Value
    ): StatusValueComponent => ({
        origin: "subject-status",
        calculationType,
        intlID: "app.mastery",
        value: {
            type: "level-dependent",
            incrementalFactor: {
                type: "mastery",
                value: mastery
            },
            multiplier,
            value: new Decimal(mastery).mul(multiplier)
        }
    });

    const adaptiveComponent = (
        origin: StatusValueComponent["origin"],
        intlID: string,
        value: Decimal.Value | undefined
    ): StatusValueComponent | undefined => {
        if (!value) return undefined;
        return {
            origin,
            calculationType: "sum",
            intlID,
            value: {
                type: "constant",
                value: new Decimal(value).mul(adaptiveForceTarget == "skillAmp" ? 2 : 1)
            }
        }
    };

    const weaponDependentBaseComponent = (
        subject: Decimal.Value,
        weapon?: Decimal.Value
    ): StatusValueComponent => ({
        origin: "subject-status",
        calculationType: "sum",
        value: {
            type: "weapon-base",
            subject,
            weapon,
            value: new Decimal(subject).add(weapon ?? 0)
        }
    });

    const ultCooldownReductionComponents = (() => {
        const standard: StatusValueComponent | undefined = (() => {
            const component = equipmentComponent("sum", {base: sumOfEquipmentStatus("cooldownReduction")});
            return component ? {...component, intlID: "装備（通常クールダウン減少）"} : undefined;
        })();

        const ult: StatusValueComponent | undefined = (() => {
            const component = equipmentComponent("sum", {base: sumOfEquipmentStatus("ultCooldownReduction")});
            return component ? {...component, intlID: "装備（究極技クールダウン減少）"} : undefined;
        })();

        return [standard, ult].filter((c): c is StatusValueComponent => c != undefined);
    })();

    const baseComponentStatus: ComponentStatus = {
        // 最大体力（整数）
        // 基礎ステータス+レベル比例ステータス+装備ステータス（定数値+レベル比例ステータス）
        maxHp: {
            digit: 0,
            components: [
                statusComponent("sum", "maxHp"),
                equipmentComponent(
                    "sum", 
                    {base: sumOfEquipmentStatus("maxHp"), levelProportional: sumOfEquipmentStatus("maxHpByLv")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 体力再生（小数点第2位まで）
        // （基礎ステータス＋レベル比例ステータス）*装備ステータス
        hpRegen: {
            digit: 2,
            components: [
                statusComponent("sum", "hpRegen"),
                equipmentComponent(
                    "mul", 
                    {base: sumOfEquipmentStatus("hpRegenRatio")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 防御力（整数）
        // 基礎ステータス+レベル比例ステータス+装備ステータス
        defense: {
            digit: 0,
            components: [
                statusComponent("sum", "defense"),
                equipmentComponent(
                    "sum", 
                    {base: sumOfEquipmentStatus("defense")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 基本攻撃ダメージ減少
        // ガーネットのパッシブスキルを除き、ステータスや装備によって獲得されない
        preventBasicAttackDamaged: { digit: 0, components: [] },
        // 基本攻撃ダメージ減少（乗算）（小数点第1位まで）
        // 防御熟練度によってのみ獲得される
        preventBasicAttackDamagedRatio: {
            digit: 1,
            components: [
                masteryComponent("sum", config.defenseMastery, BasicAttackReductionPerMastery)
            ]
        },
        // スキルダメージ減少（乗算）（小数点第1位まで）
        // 防御熟練度によってのみ獲得される
        preventSkillDamagedRatio: {
            digit: 1,
            components: [
                masteryComponent("sum", config.defenseMastery, SkillReductionPerMastery)
            ]
        },

        // 攻撃力（整数）
        // 基礎ステータス+レベル比例ステータス+装備ステータス（定数値+レベル比例ステータス）
        // （イアンのみ）+武器熟練度比例ステータス
        // （武器熟練度比例ステータスがスキル増幅でない場合のみ）+適合型能力の1倍
        attackPower: {
            digit: 0,
            components: [
                statusComponent("sum", "attackPower"),
                equipmentComponent(
                    "sum",
                    {base: sumOfEquipmentStatus("attackPower"), levelProportional: sumOfEquipmentStatus("attackPowerByLv")}
                ),
                adaptiveForceTarget != "skillAmp" ? adaptiveComponent("equipment", "equipment.status.adaptive", sumOfEquipmentStatus("adaptiveForce")) : undefined,
                weaponMasteryStatus?.type == "attack_power" ? masteryComponent("sum", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 基本攻撃増幅（小数点第1位まで）
        // 装備ステータス（レベル比例ステータス、エキオンのデスアダーのみ）+武器熟練度比例ステータス
        increaseBasicAttackDamageRatio: {
            digit: 1,
            components: [
                equipmentComponent("sum", {levelProportional: sumOfEquipmentStatus("increaseBasicAttackDamageRatioByLv")}),
                weaponMasteryStatus?.type == "basic_attack_amp" ? masteryComponent("sum", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 攻撃速度（小数点第2位まで、最大2.5）
        // 武器の基礎攻撃速度（基礎値）x {装備ステータス（%表記）+ 武器熟練度比例ステータス（%表記）}
        attackSpeed: {
            digit: 2,
            max: 2.5,
            components: [
                weaponDependentBaseComponent(level1Status.attackSpeed, weaponBaseStatus?.attackSpeed),
                equipmentComponent("mul", {base: sumOfEquipmentStatus("attackSpeedRatio")}),
                weaponMasteryStatus ? masteryComponent("mul", config.weaponMastery, weaponMasteryStatus.attackSpeed) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 致命打確率（小数点第1位まで、最大100）
        // 装備ステータス（%表記）
        criticalStrikeChance: {
            digit: 0,
            max: 100,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("criticalStrikeChance")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 致命打ダメージ（小数点第1位まで）
        // 基礎値+75%に、さらに装備によって獲得された%表記のダメージが加算され、最終的な割合が乗算で追加される
        // ここで計算されるのは75%に加算される割合のみ
        criticalStrikeDamage: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("criticalStrikeDamage")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // スキル増幅（整数）
        // 定数値*(1+増幅率）によって算出される
        //
        // ## 基礎値
        // パッシブスキルやバフなどによって獲得される定数値+レベル比例ステータス+装備ステータス
        // （武器熟練度比例ステータスがスキル増幅の場合のみ）+適合型能力値の2倍
        //
        // ## 増幅率
        // 武器熟練度比例ステータス（スキル増幅）+装備ステータス（%表記、「固有」がついているもの（例：ペルソナ）とついていないもの（例：キルヒール）がある）
        skillAmp: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("skillAmp"), levelProportional: sumOfEquipmentStatus("skillAmpByLevel")}),
                adaptiveForceTarget == "skillAmp" ? adaptiveComponent("equipment", "equipment.status.adaptive", sumOfEquipmentStatus("adaptiveForce")) : undefined,
                equipmentComponent("mul", {base: maxOfEquipmentStatus("uniqueSkillAmpRatio")}),
                equipmentComponent("mul", {base: sumOfEquipmentStatus("skillAmpRatio")}),
                weaponMasteryStatus?.type == "skill_amp" ? masteryComponent("mul", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // クールダウン減少（整数）
        // 実際のスキルクールダウン減少量はこの値からさらに100/(100+クールダウン減少)によって算出される
        // 装備ステータスで獲得
        // （レノアのみ）+アッチェレランドによるクールダウン減少獲得あり
        cooldownReduction: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("cooldownReduction")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 究極技クールダウン減少（整数）
        // 実際の究極技クールダウン減少量はこの値からさらに100/(100+クールダウン減少+究極技クールダウン減少)によって算出される
        // 装備ステータスで獲得
        ultCooldownReduction: {
            digit: 0,
            components: ultCooldownReductionComponents
        },
        // 戦術スキルクールダウン減少（整数）
        // 実際の戦術スキルクールダウン減少量はこの値からさらに100/(100+戦術スキルクールダウン減少)によって算出される
        // 通常のクールダウン減少は考慮されない
        // 装備ステータスで獲得
        tacticalSkillCooldownReduction: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("tacticalCooldownReduction")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // 防御貫通（定数値）（整数）
        // 装備ステータスで獲得
        penetrationDefense: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("penetrationDefense")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 防御貫通（割合）（整数）
        // 装備ステータスで獲得
        penetrationDefenseRatio: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("penetrationDefenseRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // 生命力吸収（整数）
        // 基本攻撃によって与えたダメージに対してのみ割合での自己回復が発生する
        // 装備ステータスで獲得
        lifeSteal: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("lifeSteal")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // ダメージ吸血（整数）
        // 与えたダメージに対して割合での自己回復が発生する（範囲攻撃に対しては33%適用）
        // 装備ステータスで獲得
        normalLifeSteal: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("normalLifeSteal")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 与える回復増加（整数）
        // 装備ステータスで獲得
        healerGiveHpHealRatio: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("healerGiveHpHealRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // 妨害耐性（整数）
        // 装備ステータスおよび一部バフ効果で獲得
        tenacity: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: maxOfEquipmentStatus("uniqueTenacity")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 移動速度（小数点以下第2位まで表示）
        // 定数値*(1+倍率)によって補正前値を算出したあと、次工程の補正によって最終的な移動速度が算出される
        //
        // ## 定数値
        // 実験体基礎移動速度+装備ステータス+移動熟練度比例値
        //
        // ## 倍率
        // 装備ステータス（%表記）
        moveSpeed: {
            digit: 2,
            components: [
                statusComponent("sum", "moveSpeed"),
                (() => {
                    const sum = sumOfEquipmentStatus("moveSpeed");
                    if (sum == undefined) return undefined;
                    return {
                        origin: "equipment",
                        intlID: "status.equipment-constant",
                        calculationType: "sum",
                        value: {
                            type: "constant",
                            value: sum
                        }
                    }
                })(),
                masteryComponent("sum", config.movementMastery, MovementSpeedPerMastery),
                (() => {
                    const sum = sumOfEquipmentStatus("moveSpeedRatio");
                    if (sum == undefined) return undefined;
                    return {
                        origin: "equipment",
                        intlID: "status.equipment-ratio",
                        calculationType: "mul",
                        value: {
                            type: "constant",
                            value: sum
                        }
                    }
                })()
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 移動速度減少耐性（整数）
        // 装備ステータスで獲得
        slowResist: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("slowResistRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 視界（小数点以下第1位まで表示）
        // 実験体基礎視界+装備ステータス
        sightRange: {
            digit: 1,
            components: [
                {origin: "subject-status", calculationType: "sum", value: {type: "constant", value: new Decimal(BaseVision)}},
                equipmentComponent("sum", {base: sumOfEquipmentStatus("sightRange")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        // 基本攻撃射程（小数点以下第1位まで表示）
        // 実験体基礎射程+武器基礎射程+装備ステータス（固有のみ存在）
        attackRange: {
            digit: 1,
            components: [
                weaponDependentBaseComponent(BaseBasicAttackRange, weaponBaseStatus?.range),
                equipmentComponent("sum", {base: maxOfEquipmentStatus("uniqueAttackRange")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        }
    }

    // クールダウン減少->スキル増幅　などのステータス変換パッシブスキルを持つ実験体の場合、変換によるステータス獲得量がこの工程で加算される
    const subjectPerpetulStatus = SubjectPerpetualStatusDictionary[config.subject] ? SubjectPerpetualStatusDictionary[config.subject](config, currentHPRatio) : {};
    const {isChestDavid, ...equipment} = config.equipment;
    const equipmentPerpetualStatus = Object.entries(equipment)
        .flatMap(([slot, equipment]) => {
            if (equipment == null) return [];
            return (EquipmentStatusDictionary[equipment].skill ?? [])
                .flatMap(ability => {
                    const entry = EquipmentAbilityPerpetualStatusDictionary[ability.skillCode];
                    if (!entry) return [];
                    return entry(config, currentHPRatio);
                })
        });

    // 他者から受けるバフ・デバフ。発生源実験体のconfigに依存しない定数カタログ（IncomingBuffDebuffCatalog）
    // から解決するため、自己バフと異なり実験体・スキルレベルによる解決は不要
    const incomingBuffStatus = config.incomingBuffs.flatMap(state => {
        const def = IncomingBuffDebuffCatalog[state.id];
        return def ? [def.buff(state.stack)] : [];
    });

    // 自己バフを含まない状態のComponentStatus。自己バフの効果量は実験体の現在のStatus（例: スキル増幅の値）
    // にも依存しうるため、自己バフ定義の解決に先立って（循環を避けるため自己バフ自身を含まない状態で）
    // 一度Statusを計算しておく必要がある
    const componentStatusWithoutSelfBuffs = foldComponentStatus(baseComponentStatus, [subjectPerpetulStatus, ...equipmentPerpetualStatus, ...incomingBuffStatus]);
    const statusForSelfBuffs: Status = {
        ...es.mapValues(es.omit(componentStatusWithoutSelfBuffs, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed", "defense"]), v => calculateStatusValue(v)),
        cooldownReduction: calculateCooldownValue(componentStatusWithoutSelfBuffs.cooldownReduction),
        ultCooldownReduction: calculateCooldownValue(componentStatusWithoutSelfBuffs.ultCooldownReduction),
        tacticalSkillCooldownReduction: calculateCooldownValue(componentStatusWithoutSelfBuffs.tacticalSkillCooldownReduction),
        moveSpeed: calculateMovementSpeedValue(componentStatusWithoutSelfBuffs.moveSpeed),
        defense: calculateDefenseValue(componentStatusWithoutSelfBuffs.defense)
    };

    // 実験体固有スキル・武器スキル・装備アビリティによる自己バフ。origin: "temporary-status"（ユーザーが
    // スタックを切り替えられる）でStatusValueComponentを注入する（origin: "perpetual_status"の恒久パッシブ
    // とは区別する）
    const selfBuffDefinitions = selfBuffDefinitionsOf(config, statusForSelfBuffs);
    const selfBuffStatus = config.selfBuffs.flatMap(state => {
        const def = selfBuffDefinitions[state.id];
        return def ? [def.buff(state.stack)] : [];
    });

    const componentStatus = foldComponentStatus(componentStatusWithoutSelfBuffs, selfBuffStatus);

    // ステータス変換によって得られる値を計算するために、その部分要素なしのステータスをまず計算する
    const statusWithoutConversion: Status = {
        ...es.mapValues(es.omit(componentStatus, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed", "defense"]), v => calculateStatusValue(v)),
        cooldownReduction: calculateCooldownValue(componentStatus.cooldownReduction),
        ultCooldownReduction: calculateCooldownValue(componentStatus.ultCooldownReduction),
        tacticalSkillCooldownReduction: calculateCooldownValue(componentStatus.tacticalSkillCooldownReduction),
        moveSpeed: calculateMovementSpeedValue(componentStatus.moveSpeed),
        defense: calculateDefenseValue(componentStatus.defense)
    };


    const finalStatus: Status = {
        ...es.mapValues(es.omit(componentStatus, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed", "defense"]), v => calculateStatusValue(v, statusWithoutConversion)),
        cooldownReduction: calculateCooldownValue(componentStatus.cooldownReduction, statusWithoutConversion),
        ultCooldownReduction: calculateCooldownValue(componentStatus.ultCooldownReduction, statusWithoutConversion),
        tacticalSkillCooldownReduction: calculateCooldownValue(componentStatus.tacticalSkillCooldownReduction, statusWithoutConversion),
        moveSpeed: calculateMovementSpeedValue(componentStatus.moveSpeed, statusWithoutConversion),
        defense: calculateDefenseValue(componentStatus.defense, statusWithoutConversion)
    };

    const summonedInfo = SubjectSummonInfoDictionary[config.subject];

    return {
        ...finalStatus,
        summoned: (summonedInfo?.length ?? 0) > 0 ?
            summonedInfo.map(info => ({
                nameIntlID: info.nameIntlID,
                status: info.status(finalStatus, config)
            }))
            : undefined
    }
}

/**
 * 既に計算済みの`Status`から、バフ・デバフ（`origin: "temporary-status"`）の寄与をすべて取り除いた版を導出する。
 *
 * 個々のバフ・デバフの「実際の寄与量」は、防御力の割合合成（複数の%が掛け算で合成される）や移動速度の
 * 区分関数補正のように合成順序に依存するステータスでは一意に定義できない。かわりに「全バフ・デバフあり」
 * と「全バフ・デバフなし」を比較する、より粗い粒度の反実仮想（`core/README.md`項目10参照）だけを提供する。
 *
 * `Status`の各フィールドは既に最終的な（値が解決済みの）`components`配列を保持しているため、`config`から
 * 再計算する必要はなく、`origin == "temporary-status"`の要素を除いた配列を対応する`calculateXValue`に
 * もう一度通すだけでよい。`status-conversion`型の値は既に`.value.value`へ解決済みであり、
 * `calculateXValue`を`statusWithoutConversion`引数なしで呼んでも（`groupComponentsAndAddXConvertedValue`の
 * ガードにより）再解決されずそのまま使われるため、これだけで安全に計算できる
 */
export function withoutTemporaryStatus(status: Status): Status {
    const strip = (components: StatusValueComponent[]) => components.filter(c => c.origin != "temporary-status");

    return {
        ...es.mapValues(
            es.omit(status, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed", "defense", "summoned"]),
            (v: StatusValue) => calculateStatusValue({ digit: v.digit, max: v.max, components: strip(v.components) })
        ),
        cooldownReduction: calculateCooldownValue({ digit: 0, components: strip(status.cooldownReduction.components) }),
        ultCooldownReduction: calculateCooldownValue({ digit: 0, components: strip(status.ultCooldownReduction.components) }),
        tacticalSkillCooldownReduction: calculateCooldownValue({ digit: 0, components: strip(status.tacticalSkillCooldownReduction.components) }),
        // MovementSpeedValueはdigitを持たない（calculateMovementSpeedValue内部でも使われない。
        // moveSpeedの表示桁数は常に2で固定されている）ため、ここでは定数を渡すだけでよい
        moveSpeed: calculateMovementSpeedValue({ digit: 2, components: strip(status.moveSpeed.components) }),
        defense: calculateDefenseValue({ digit: status.defense.digit, max: status.defense.max, components: strip(status.defense.components) }),
        summoned: status.summoned
    };
}