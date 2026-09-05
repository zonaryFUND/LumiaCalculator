import { SubjectConfig } from "core/subject-dynamic/config";
import { ComponentStatus, Status, SummonedStatus } from "core/subject-dynamic/status/type";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { DamageTableUnit } from "core/damage-table/unit";
import { UniqueValueStrategy } from "./unique-value-strategy";
import { ValueRatio } from "core/value-ratio";
import { IntlShape } from "react-intl";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export type SubjectDamageTableUnit = Omit<DamageTableUnit, "triggeredOnBasicAttack"> & {
    value: ValueRatio | UniqueValueStrategy
}

export type DamageTableGenerator = (props: {config: SubjectConfig, status: Status, intl: IntlShape}) => DamageTable;

export type BasicAttackElement = SubjectDamageTableUnit | "standard" | "disable-critical"

export type DamageTable = {
    basicAttack: BasicAttackElement[]
    skill: SubjectDamageTableUnit[][]
    weaponSkill?: DamageTableUnit[]
}

// 実験体の各固有スキルについて、キーに対応するl10nコード、またはその配列、あるいはそれに非標準の最大レベルを追加したもの
export type SkillCodes = number | number[] | { 
    maxLevel?: number | "none",
    code: number | number[]
 }

export type SkillListHook = (config: SubjectConfig) => Record<"Q" | "W" | "E" | "R" | "T", SkillCodes> & {
    D?: SkillCodes
};

export type SubjectPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatus;
export type SummonInfo = {
    status: SummonedStatusFunc,
    nameIntlID: string
}

export type SubjectGaugeInfo = {
    nameIntlID: string
    threshold?: number
    max?: number | { maxHPRatio: number }
    changeColorOnMax: boolean
}

export type SubjectStackInfo = {
    nameIntlID: string
    max: number
}

export type SelfBuffDebuffs = Record<string, BuffDebuffDefinition>

/**
 * 実験体固有のスキルによる自己バフの定義を、実験体設定から算出する
 *
 * スキルレベル等によって効果内容（`nameIntlID`・`availableStacks`・`buff`の効果量）が変化しうるため、
 * `SubjectPerpetualStatus`と同様に`SubjectConfig`を受け取る関数として定義する。効果量が実験体の
 * 現在のステータス（例: スキル増幅の値）にも依存する場合があるため、計算済みの`Status`も受け取れる
 * （`statusOf()`内で自己バフを含まない中間状態のStatusとして渡される。呼び出し側で毎回`SubjectConfig`
 * から計算し直すコストを避けるための設計）
 */
export type SubjectSelfBuffDebuff = (config: SubjectConfig, status: Status) => SelfBuffDebuffs

export type SubjectModules = {
    code: number
    damageTable: DamageTableGenerator

    skills: {
        listExpression: SkillListHook // | React.FC<SkillsStandardProps>
        tooltip: Record<number, SkillTooltipProps>
    }

    perpetualStatus?: SubjectPerpetualStatus
    summoned?: SummonInfo[]
    stackInfo?: SubjectStackInfo
    gaugeInfo?: SubjectGaugeInfo

    /**
     * 実験体固有のスキルによって得られる自己バフの定義
     */
    buffDebuff?: SubjectSelfBuffDebuff

    /**
     * 実験体固有のスキルが他者（敵）に与えるバフ・デバフの定義。
     * 受信側の計算機は発生源実験体のSubjectConfigを保持していないため、SubjectSelfBuffDebuffと異なり
     * configを引数に取らない定数カタログとして定義する。
     */
    givenBuffDebuff?: Record<string, BuffDebuffDefinition>

    /**
     * 実験体固有のスキルが持つ移動速度減少（スロウ）効果の宣言。計算には一切関与しない参照専用データで、
     * 「辞書」UI（`slow-dictionary.ts`）が集約して表示するためだけに使う（`generic-slow.ts`参照）。
     * スロウを持つスキルがあっても、これとは別に`givenBuffDebuff`へ個別登録してはいけない
     * （汎用エントリと二重計算になるため）
     */
    slowSources?: SlowSourceInfo[]

    weaponSkillLevelOverride?: (mastery: number) => number

    /**
     * `weaponRangeOf`（`core/subject-dynamic/config/function.ts`）が返す近接/遠隔区分を上書きする。
     * ほとんどの実験体は「装備できる武器種の近接/遠隔区分＝実験体の近接/遠隔区分」（未装備でも適用）という
     * 共通ルールで正しく判定できるため、このフィールドは以下のような例外を持つ実験体だけが定義する:
     *
     * - 常に固定（武器種によらない）: アデラ・ティア（近接武器のみ装備可能だが常に遠隔実験体として扱う）
     * - 能動的に切り替える変身型（アレックス以外）: イレム（イレム=遠隔/ネコ=近接、`config.selfBuffs`の
     *   `"subject.irem.t-mode"`で判定）、シルヴィア（人間=遠隔/バイク=近接、`"subject.silvia.r-mode"`で判定）。
     *   `weaponRangeOf`という共通関数に実験体固有のバフ判定を直接書くのは依存関係として不適切なため、
     *   実験体側にこの関数を定義させ、`weaponRangeOf`側は`SubjectWeaponRangeOverrideDictionary`
     *   （`dictionary.ts`）を経由して間接的に参照する
     * - 近接・遠隔両方の武器を装備できるアレックスのみ、未装備時のデフォルト（近接）がここで必要
     *   （装備中は共通ルール通り現在の武器種で判定できるため、このケースだけ`undefined`を返す）
     *
     * デビー＆マーリン（変身型だが両形態とも武器種が両手剣＝近接で共通ルールのまま正しい）・ヴァーニャ
     * （事実上近接実験体と見なされているが内部処理・武器種＝アルカナは遠隔のまま）は、共通ルールのまま
     * 変更しないため、このフィールドを定義しない
     */
    weaponRangeOverride?: (config: SubjectConfig) => "melee" | "range" | undefined
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };