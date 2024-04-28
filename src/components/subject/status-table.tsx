import * as React from "react";
import { SubjectConfig } from "./use-subject-config";
import useStatus from "./use-status";
import { FirstAid, Lightning, Shield, Sword, Plus, Wind, Crosshair, ArrowFatLinesUp, Hourglass, ShieldSlash, Syringe, FirstAidKit, HandFist, SneakerMove, Eye, ArrowFatLineRight, IconContext } from "@phosphor-icons/react"
import Decimal from "decimal.js";
import style from "./status-table.module.styl";
import { useToggle } from "react-use";
import { BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, SkillReductionPerMastery } from "./standard-values";
import StandardExpand from "./status-table/standard-expand";
import AttackPower from "./status-table/attack-power";
import InnerTable from "./status-table/inner-table";
import BasicAttackAmp from "./status-table/basic-attack-amp";
import AttackSpeed from "./status-table/attack-speed";
import Mastery from "./status-table/mastery";
import SkillAmp from "./status-table/skill-amp";
import MovementSpeed from "./status-table/movement-speed";
import BasicAttackRange from "./status-table/basic-attack-range";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expandTooltip?: string
    prohibitExpand?: boolean
}

const Column: React.FC<ColumnProps> = props => {
    const [expand, toggleExpand] = useToggle(false);
    React.useEffect(() => {
        if (props.prohibitExpand) toggleExpand(false);
    }, [props.prohibitExpand]);

    return (
        <>
            <tr onClick={props.prohibitExpand ? undefined : toggleExpand}>
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
                            <StandardExpand {...displayed.hpReg} level={props.level} digit={2} method="round" />
                        </Column>
                        <Column name={<><Shield />防御力</>} value={status.defense}>
                            <StandardExpand {...displayed.defense} level={props.level} />
                        </Column>
                        <Column name={<>{basicAttackRecuction}基本攻撃ダメージ減少</>} value={status.basicAttackReduction} percent>
                            <InnerTable>
                                <tr><td>実験体</td><td><Mastery perMastery={BasicAttackReductionPerMastery} name="防御熟練度" mastery={props.defenseMastery} percent /></td></tr>
                            </InnerTable>
                        </Column>
                        <Column name={<>{skillRecuction}スキルダメージ減少</>} value={status.skillReduction} percent>
                            <InnerTable>
                                <tr><td>実験体</td><td><Mastery perMastery={SkillReductionPerMastery} name="防御熟練度" mastery={props.defenseMastery} percent /></td></tr>
                                {
                                    displayed.additionalSkillDamageReduction.greaterThan(0) ?
                                    <tr><td>追加値</td><td>{displayed.additionalSkillDamageReduction.toString()}％</td></tr> :
                                    null
                                }
                            </InnerTable>
                        </Column>
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>スタミナ</td></tr>
                        <Column name={<><Lightning weight="fill" />最大スタミナ</>} value={status.maxSP}>
                            <StandardExpand {...displayed.maxSP} level={props.level} />
                        </Column>
                        <Column name={<><Lightning />スタミナ再生</>} value={status.spReg}>
                            <StandardExpand {...displayed.spReg} level={props.level} digit={2} method="round" />
                        </Column>
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>基本攻撃系ステータス</td></tr>
                        <Column name={<><Sword />攻撃力</>} value={status.attackPower}>
                            <AttackPower {...displayed.attackPower} level={props.level} mastery={props.weaponMastery} adaptive={status.addAdaptiveTo == "attack" ? status.adaptiveStatus : undefined} />
                        </Column>
                        <Column name={<>{basicAttackAmp}基本攻撃増幅</>} value={status.basicAttackAmp} percent prohibitExpand={status.basicAttackAmp.isZero()}>
                            <BasicAttackAmp {...displayed.basicAttackAmp} level={props.level} mastery={props.weaponMastery} />
                        </Column>
                        <Column name={<>{attackSpeed}攻撃速度</>} value={status.attackSpeed.calculated} expandTooltip="基本攻撃速度は内部値を3桁目で四捨五入した値が表示されます。最終的な値の計算には3桁目を切り捨てた値が使われます。意図は不明です。">
                            <AttackSpeed base={status.attackSpeed.base} {...displayed.attackSpeed} weaponMastery={props.weaponMastery} />
                        </Column>
                        <Column name={<><Crosshair />致命打確率</>} value={status.criticalChance} percent />
                        <Column name={<>{criticalDamage}致命打ダメージ上昇量</>} value={status.criticalDamage} percent />
                    </tbody>
                    <tbody>
                        <tr className={style.separator}><td colSpan={2}>スキル系ステータス</td></tr>
                        <Column name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} value={status.skillAmp}>
                            <SkillAmp base={status.baseSkillAmp} perMastery={displayed.skillAmp.perMastery} mastery={props.weaponMastery} adaptive={status.addAdaptiveTo == "amp" ? status.adaptiveStatus : undefined} equipmentRatio={displayed.skillAmp.equipmentRatio} />
                        </Column>
                        <Column name={<><Hourglass />クールダウン減少</>} value={status.cooldownReduction} percent prohibitExpand={status.cdrMax.lessThanOrEqualTo(BaseCooldownCap)}>
                            <InnerTable>
                                <tr><td>最大クールダウン減少</td><td>+{status.cdrMax.sub(BaseCooldownCap).toString()}％</td></tr>
                            </InnerTable>
                        </Column>
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
                        <Column name={<><SneakerMove />移動速度</>} value={status.movementSpeed}>
                            <MovementSpeed {...displayed.movementSpeed} movementMastery={props.movementMastery} />
                        </Column>
                        <Column name={<><Eye />視界範囲</>} value={status.visionRange} prohibitExpand={displayed.additionalVision.isZero()}>
                            <InnerTable>
                                <tr><td>基礎値</td><td>{BaseVision}</td></tr>
                                <tr><td>追加値</td><td>{displayed.additionalVision.toString()}</td></tr>
                            </InnerTable>
                        </Column>
                        <Column name={<><ArrowFatLineRight />基本攻撃射程</>} value={status.basicAttackRange} prohibitExpand={displayed.basicAttackRange.weapon.isZero()}>
                            <BasicAttackRange {...displayed.basicAttackRange} />
                        </Column>
                    </tbody>
                </table>
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;