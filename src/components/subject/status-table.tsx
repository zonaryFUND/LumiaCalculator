import * as React from "react";
import { SubjectConfig } from "./use-subject-config";
import useStatus, { DisplayedValues } from "./use-status";
import { FirstAid, Lightning, Shield, Sword, Plus, Wind, Crosshair, ArrowFatLinesUp, Hourglass, ShieldSlash, Syringe, FirstAidKit, HandFist, SneakerMove, Eye, ArrowFatLineRight, IconContext } from "@phosphor-icons/react"
import Decimal from "decimal.js";
import style from "./status-table.module.styl";
import { useToggle } from "react-use";
import { BaseBasicAttackRange, baseStatus as getBaseStatus } from "@app/entity/base-status";
import { BasicAttackReductionPerMastery, SkillReductionPerMastery } from "./standard-values";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expandTooltip?: string
}

const Column: React.FC<ColumnProps> = props => {
    const [expand, toggleExpand] = useToggle(false);

    return (
        <>
            <tr onClick={toggleExpand}>
                <td className={style.label}>{props.name}</td>
                <td className={style.value}>{props.value.toString() + (props.percent ? "％" : "")}</td>
            </tr>  
            {
                expand && props.children ? 
                <tr className={style.expand}><td colSpan={2}>{props.children}</td></tr> :
                null
            }
        </>
    );
}

type StandardExpandProps = DisplayedValues & {
    level: number
}

const StandardExpand: React.FC<StandardExpandProps> = props => {
    const { baseValue, displayedBase } = React.useMemo(() => {
        const value = props.base.perLevel ?
            props.base.level1.add(props.base.perLevel.times(props.level - 1)) :
            props.base.level1;
            
        return {
            baseValue: value,
            displayedBase: <>{props.base.level1.toString()}{props.base.perLevel ? <>+ {props.base.perLevel.times(props.level - 1).toString()} <span>({props.base.perLevel.toString()} x {props.level - 1})</span></> : null} = {value.toString()}</>
        };
    }, [props.base.level1, props.base.perLevel, props.level]);

    const additional = React.useMemo(() => {
        if (props.additional.constant?.greaterThan(0) || props.additional.perLevel?.greaterThan(0)) {
            const constant = props.additional.constant?.greaterThan(0) ? <>{props.additional.constant.toString()}</> : null
            const perLevel = props.additional.perLevel?.greaterThan(0) ? <>{props.additional.perLevel.times(props.level).toString()} <span>({props.additional.perLevel.toString()} x {props.level})</span></> : null
            return (
                <>
                    {constant}
                    {constant && perLevel ? " + " : null}
                    {perLevel}
                    <> = {(props.additional.constant || new Decimal(0)).add((props.additional.perLevel || new Decimal (0)).times(props.level)).toString()}</>
                </>
            );
        } else if (props.additional.ratio?.greaterThan(0)) {
            return (
                <>
                    {props.additional.ratio.toString()}％
                    <> = {baseValue.percent(props.additional.ratio).toString()}</>
                </> 
            );
        } else {
            return <>0</>;
        }
    }, [props.additional]);

    return (
        <table className={style.inner}>
            <tr><td>実験体</td><td>{displayedBase}</td></tr>
            <tr><td>追加値</td><td>{additional}</td></tr>
        </table>
    );
}

const basicAttackRecuction = <span className={style["basic-attack-reduction"]}><Shield /><Sword /></span>
const skillRecuction = <span className={style["basic-attack-reduction"]}><Shield /><ArrowFatLinesUp /></span>
const basicAttackAmp = <span className={style["basic-attack-amp"]}><Sword /><Plus weight="bold" /></span>
const attackSpeed = <span className={style["attack-speed"]}><Sword /><Wind weight="bold" /></span>
const criticalDamage = <span className={style["critical-damage"]}><Crosshair /><Plus weight="bold" /></span>

const status: React.FC<SubjectConfig> = props => {
    const [status, displayed] = useStatus(props);

    return (
        <IconContext.Provider value={{size: 18}}>
        <section className={style.status}>
            <h3>ステータス</h3>
            <div className={style.parent}>
                <table>
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>値</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}><div><p>耐久</p><p>実効体力: {displayed.effectiveHP.toString()}</p></div></td></tr>
                        <Column name={<><FirstAid weight="fill" />最大体力</>} value={status.maxHP}>
                            <StandardExpand {...displayed.maxHP} level={props.level} />
                        </Column>
                        <Column name={<><FirstAid />体力再生</>} value={status.hpReg}>
                            <StandardExpand {...displayed.hpReg} level={props.level} />
                        </Column>
                        <Column name={<><Shield />防御力</>} value={status.defense}>
                            <StandardExpand {...displayed.defense} level={props.level} />
                        </Column>
                        <Column name={<>{basicAttackRecuction}基本攻撃ダメージ減少</>} value={status.basicAttackReduction} percent>
                            <table className={style.inner}>
                                <tr><td>実験体</td><td><span>({BasicAttackReductionPerMastery}％ x 防御熟練度{props.defenseMastery})</span> = {status.basicAttackReduction.toString()}％</td></tr>
                            </table>
                        </Column>
                        <Column name={<>{skillRecuction}スキルダメージ減少</>} value={status.skillReduction} percent>
                            <table className={style.inner}>
                                <tr><td>実験体</td><td><span>({SkillReductionPerMastery}％ x 防御熟練度{props.defenseMastery})</span> = {new Decimal(SkillReductionPerMastery).times(props.defenseMastery).toString()}％</td></tr>
                                <tr><td>追加値</td><td>{displayed.additionalSkillDamageReduction.toString()}％</td></tr>
                            </table>
                        </Column>
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>スタミナ</td></tr>
                        <Column name={<><Lightning weight="fill" />最大スタミナ</>} value={status.maxSP}>
                            <StandardExpand {...displayed.maxSP} level={props.level} />
                        </Column>
                        <Column name={<><Lightning />スタミナ再生</>} value={status.spReg}>
                            <StandardExpand {...displayed.spReg} level={props.level} />
                        </Column>
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>基本攻撃系ステータス</td></tr>
                        <Column name={<><Sword />攻撃力</>} value={status.attackPower} />
                        <Column name={<>{basicAttackAmp}基本攻撃増幅</>} value={status.basicAttackAmp} percent />
                        <Column name={<>{attackSpeed}攻撃速度</>} value={status.attackSpeed.calculated} expandTooltip="基本攻撃速度は内部値を3桁目で四捨五入した値が表示されます。最終的な値の計算には3桁目を切り捨てた値が使われます。意図は不明です。">
                            基本攻撃速度 {status.attackSpeed.base.toString()} x 攻撃速度増加 {status.attackSpeed.multiplier.toString()}％
                        </Column>
                        <Column name={<><Crosshair />致命打確率</>} value={status.criticalChance} percent />
                        <Column name={<>{criticalDamage}致命打ダメージ上昇量</>} value={status.criticalDamage} percent />
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>スキル系ステータス</td></tr>
                        <Column name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} value={status.skillAmp} percent />
                        <Column name={<><Hourglass />クールダウン減少</>} value={status.cooldownReduction} percent />
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>防御貫通</td></tr>
                        <Column name={<><Syringe />防御貫通(定数)</>} value={status.armorPenetration} />
                        <Column name={<><Syringe />防御貫通(％)</>} value={status.armorPenetrationRatio} percent />
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>回復系ステータス</td></tr>
                        <Column name={<><Syringe />生命力吸収</>} value={status.lifeSteal} percent />
                        <Column name={<><Syringe />ダメージ吸血</>} value={status.omnisyphon} percent />
                        <Column name={<><FirstAidKit />与える回復増加</>} value={status.healPower} percent />
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>その他</td></tr>
                        <Column name={<><HandFist />行動妨害体制</>} value={status.tenacity} percent />
                        <Column name={<><SneakerMove />移動速度</>} value={status.movementSpeed} />
                        <Column name={<><Eye />視界範囲</>} value={status.visionRange} />
                        <Column name={<><ArrowFatLineRight />基本攻撃射程</>} value={status.basicAttackRange} />
                        
                    </tbody>
                </table>
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;