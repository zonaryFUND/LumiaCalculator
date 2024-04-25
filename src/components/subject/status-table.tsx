import * as React from "react";
import { SubjectConfig } from "./use-subject-config";
import useStatus from "./use-status";
import { FirstAid, Lightning, Shield, Sword, Plus, Wind, Crosshair, ArrowFatLinesUp, Hourglass, ShieldSlash, Syringe, FirstAidKit, HandFist, SneakerMove, Eye, ArrowFatLineRight } from "@phosphor-icons/react"
import Decimal from "decimal.js";
import style from "./status-table.module.styl";
import { useToggle } from "react-use";
import { BaseBasicAttackRange, baseStatus as getBaseStatus } from "@app/entity/base-status";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expandTooltip?: string
}

const Column: React.FC<ColumnProps> = props => {
    const [expand, toggleExpand] = useToggle(false);

    if (props.value.isZero()) return null;

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.name}</td>
                <td>{props.value.toString() + (props.percent ? "％" : "")}</td>
                <td>0</td>
                <td>{props.value.toString() + (props.percent ? "％" : "")}</td>
            </tr>  
            {
                expand && props.children ?
                <tr data-tooltip={props.expandTooltip ? "attack-speed-desc" : undefined} data-tooltip-content={props.expandTooltip}>
                    <td colSpan={4}>{props.children}</td>
                </tr>
                :
                null
            }
        </>
    );
}

type StandardExpandProps = {
    base: Decimal
    perLevel: Decimal
    level: number
    additional: Decimal
}

const StandardExpand: React.FC<StandardExpandProps> = props => (
    <>基礎値 {props.base.toString()} + 成長 {props.perLevel.times(props.level - 1).toString()} ({props.perLevel.toString()} x {props.level - 1}) + 追加値 {props.additional.toString()}</>
);

const basicAttackRecuction = <span className={style["basic-attack-reduction"]}><Shield /><Sword /></span>
const skillRecuction = <span className={style["basic-attack-reduction"]}><Shield /><ArrowFatLinesUp /></span>
const basicAttackAmp = <span className={style["basic-attack-amp"]}><Sword /><Plus weight="bold" /></span>
const attackSpeed = <span className={style["attack-speed"]}><Sword /><Wind weight="bold" /></span>
const criticalDamage = <span className={style["critical-damage"]}><Crosshair /><Plus weight="bold" /></span>

const status: React.FC<SubjectConfig> = props => {
    const status = useStatus(props);
    const baseStatus = React.useMemo(() => getBaseStatus(props.subject), [props.subject]);

    return (
        <section className={style.status}>
            <h3>ステータス</h3>
            <div className={style.parent}>
                <table>
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>平常値</th>
                            <th>変化量</th>
                            <th>合計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={style.separator}><td colSpan={4}>耐久</td></tr>
                        <Column name={<><FirstAid weight="fill" />最大体力</>} value={status.maxHP}>
                            <StandardExpand base={baseStatus.maxHP} perLevel={baseStatus.maxHPperLevel} level={props.level} additional={status.additionalMaxHP} />
                        </Column>
                        <Column name={<><FirstAid />体力再生</>} value={status.hpReg}>
                            <StandardExpand base={baseStatus.hpRegeneration} perLevel={baseStatus.hpRegenPerLevel} level={props.level} additional={status.hpReg} />
                        </Column>
                        <Column name={<><Shield />防御力</>} value={status.defense} />
                        <Column name={<>{basicAttackRecuction}基本攻撃ダメージ減少</>} value={status.basicAttackReduction} percent />
                        <Column name={<>{skillRecuction}スキルダメージ減少</>} value={status.skillReduction} percent />

                        <tr className={style.separator}><td colSpan={4}>スタミナ</td></tr>
                        <Column name={<><Lightning weight="fill" />最大スタミナ</>} value={status.maxSP} />
                        <Column name={<><Lightning />スタミナ再生</>} value={status.spReg} />

                        <tr className={style.separator}><td colSpan={4}>基本攻撃系ステータス</td></tr>
                        <Column name={<><Sword />攻撃力</>} value={status.attackPower} />
                        <Column name={<>{basicAttackAmp}基本攻撃増幅</>} value={status.basicAttackAmp} percent />
                        <Column name={<>{attackSpeed}攻撃速度</>} value={status.attackSpeed.calculated} expandTooltip="基本攻撃速度は内部値を3桁目で四捨五入した値が表示されます。最終的な値の計算には3桁目を切り捨てた値が使われます。意図は不明です。">
                            基本攻撃速度 {status.attackSpeed.base.toString()} x 攻撃速度増加 {status.attackSpeed.multiplier.toString()}％
                        </Column>
                        <Column name={<><Crosshair />致命打確率</>} value={status.criticalChance} percent />
                        <Column name={<>{criticalDamage}致命打ダメージ上昇量</>} value={status.criticalDamage} percent />

                        <tr className={style.separator}><td colSpan={4}>スキル系ステータス</td></tr>
                        <Column name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} value={status.skillAmp} percent />
                        <Column name={<><Hourglass />クールダウン減少</>} value={status.cooldownReduction} percent />

                        <tr><td>防御貫通</td></tr>
                        <Column name={<><Syringe />防御貫通(定数)</>} value={status.armorPenetration} />
                        <Column name={<><Syringe />防御貫通(％)</>} value={status.armorPenetrationRatio} percent />

                        <tr className={style.separator}><td colSpan={4}>回復系ステータス</td></tr>
                        <Column name={<><Syringe />生命力吸収</>} value={status.lifeSteal} percent />
                        <Column name={<><Syringe />ダメージ吸血</>} value={status.omnisyphon} percent />
                        <Column name={<><FirstAidKit />与える回復増加</>} value={status.healPower} percent />

                        <tr className={style.separator}><td colSpan={4}>その他</td></tr>
                        <Column name={<><HandFist />行動妨害体制</>} value={status.tenacity} percent />
                        <Column name={<><SneakerMove />移動速度</>} value={status.movementSpeed} />
                        <Column name={<><Eye />視界範囲</>} value={status.visionRange} />
                        <Column name={<><ArrowFatLineRight />基本攻撃射程</>} value={status.basicAttackRange} />
                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default status;