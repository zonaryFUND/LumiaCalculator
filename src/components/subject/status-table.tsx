import * as React from "react";
import { SubjectConfig } from "./use-subject-config";
import { DisplayedStatusValues } from "./use-status";
import { FirstAid, Lightning, Shield, Sword, Plus, Wind, Crosshair, 
    ArrowFatLinesUp, Hourglass, ShieldSlash, Drop, FirstAidKit, 
    HandFist, SneakerMove, Eye, ArrowFatLineRight, IconContext,
    CaretDown, CaretUp
} from "@phosphor-icons/react"
import Decimal from "decimal.js";
import style from "./status-table.module.styl";
import { useToggle } from "react-use";
import { BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, SkillReductionPerMastery } from "./standard-values";
import StandardExpand from "./status-table/standard-expand";
import AttackPower from "./status-table/attack-power";
import InnerTable from "components/common/inner-table";
import BasicAttackAmp from "./status-table/basic-attack-amp";
import AttackSpeed from "./status-table/attack-speed";
import Mastery from "./status-table/mastery";
import SkillAmp from "./status-table/skill-amp";
import MovementSpeed from "./status-table/movement-speed";
import BasicAttackRange from "./status-table/basic-attack-range";
import useStatusToggle from "./use-status-toggle";
import SegmentedControl from "components/common/segmented-control";
import { name } from "@app/entity/subject";
import { SummonedStatus } from "components/subjects/summoned-status";
import { Status } from "./status";
import table from "components/common/table.styl";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expandTooltip?: string
    prohibitExpand?: boolean
    hidden: boolean
}

const Column: React.FC<ColumnProps> = props => {
    const [expand, toggleExpand] = useToggle(false);
    React.useEffect(() => {
        if (props.prohibitExpand) toggleExpand(false);
    }, [props.prohibitExpand]);

    return (
        <>
            <tr className={props.value.isZero() ? style.zero : undefined} onClick={props.prohibitExpand ? undefined : toggleExpand} style={props.hidden ? {display: "none"} : undefined}>
                <td className={table.label}>{props.name}</td>
                <td className={table.value}>{props.value.toString() + (props.percent ? "％" : "")}</td>
            </tr>  
            {
                expand && props.children ? 
                <tr className={table.expand} style={props.hidden ? {display: "none"} : undefined}><td colSpan={2}>{props.children}</td></tr> :
                null
            }
        </>
    );
}

const basicAttackRecuction = <span className={style["basic-attack-reduction"]}><Shield /><Sword /></span>
const skillRecuction = <span className={style["basic-attack-reduction"]}><Shield /><ArrowFatLinesUp weight="fill" /></span>
const basicAttackAmp = <span className={style["basic-attack-amp"]}><Sword /><Plus weight="bold" /></span>
const attackSpeed = <span className={style["attack-speed"]}><Sword /><Wind weight="bold" /></span>
const criticalDamage = <span className={style["critical-damage"]}><Crosshair /><Plus weight="bold" /></span>

const status: React.FC<SubjectConfig & {status: [Status, DisplayedStatusValues]}> = props => {
    const [status, displayed] = props.status;
    const toggle = useStatusToggle();
    const subjectName = React.useMemo(() => name(props.subject, "jp"), [props.subject]);
    const summonedName = React.useMemo(() => {
        if (SummonedStatus[props.subject] == undefined) return null;
        return SummonedStatus[props.subject].name("jp");
    }, [props.subject]);
    const shownStatus = React.useState<string | undefined>("subject");

    return (
        <IconContext.Provider value={{size: 18}}>
        <section className={style.status}>
            <header>    
                <h3>ステータス</h3>
                {
                    summonedName ?
                    <SegmentedControl 
                        name="summoned-status" 
                        segments={[{title: subjectName, value: "subject"}, {title: summonedName, value: "summoned"}]} 
                        value={shownStatus}
                        style={{verticalPadding: 2}}
                    /> :
                    null
                }
                
            </header>
            <div className={table["table-base"]}>
                {
                    shownStatus[0] == "subject" || status.summonedStatus == undefined ?
                    <table>
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.toughness[1]}><td colSpan={2}><div><p>耐久 / 実効体力: {displayed.effectiveHP.toString()}</p>{toggle.toughness[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><FirstAid weight="fill" />最大体力</>} value={status.maxHP} hidden={toggle.toughness[0]}>
                                <StandardExpand {...displayed.maxHP} level={props.level} />
                            </Column>
                            <Column name={<><FirstAid />体力再生</>} value={status.hpReg} hidden={toggle.toughness[0]}>
                                <StandardExpand {...displayed.hpReg} level={props.level} digit={2} method="round" />
                            </Column>
                            <Column name={<><Shield />防御力</>} value={status.defense} hidden={toggle.toughness[0]}>
                                <StandardExpand {...displayed.defense} level={props.level} />
                            </Column>
                            <Column name={<>{basicAttackRecuction}基本攻撃ダメージ減少</>} value={status.basicAttackReduction} percent hidden={toggle.toughness[0]}>
                                <InnerTable>
                                    <tr><td>実験体</td><td><Mastery perMastery={BasicAttackReductionPerMastery} name="防御熟練度" mastery={props.defenseMastery} percent /></td></tr>
                                </InnerTable>
                            </Column>
                            <Column name={<>{skillRecuction}スキルダメージ減少</>} value={status.skillReduction} percent hidden={toggle.toughness[0]}>
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
                            <tr className={table.separator} onClick={toggle.stamina[1]}><td colSpan={2}><div><p>スタミナ</p>{toggle.stamina[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Lightning weight="fill" />最大スタミナ</>} value={status.maxSP} hidden={toggle.stamina[0]}>
                                <StandardExpand {...displayed.maxSP} level={props.level} />
                            </Column>
                            <Column name={<><Lightning />スタミナ再生</>} value={status.spReg} hidden={toggle.stamina[0]}>
                                <StandardExpand {...displayed.spReg} level={props.level} digit={2} method="round" />
                            </Column>
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.basicAttack[1]}><td colSpan={2}><div><p>基本攻撃</p>{toggle.basicAttack[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Sword />攻撃力</>} value={status.attackPower} hidden={toggle.basicAttack[0]}>
                                <AttackPower {...displayed.attackPower} level={props.level} mastery={props.weaponMastery} adaptive={status.addAdaptiveTo == "attack" ? status.adaptiveStatus : undefined} ratio={status.attackPowerRatio} />
                            </Column>
                            <Column name={<>{basicAttackAmp}基本攻撃増幅</>} value={status.basicAttackAmp} percent prohibitExpand={status.basicAttackAmp.isZero()} hidden={toggle.basicAttack[0]}>
                                <BasicAttackAmp {...displayed.basicAttackAmp} level={props.level} mastery={props.weaponMastery} />
                            </Column>
                            <Column name={<>{attackSpeed}攻撃速度</>} value={status.attackSpeed.calculated} expandTooltip="基本攻撃速度は内部値を3桁目で四捨五入した値が表示されます。最終的な値の計算には3桁目を切り捨てた値が使われます。意図は不明です。" hidden={toggle.basicAttack[0]}>
                                <AttackSpeed base={status.attackSpeed.base} {...displayed.attackSpeed} weaponMastery={props.weaponMastery} />
                            </Column>
                            <Column name={<><Crosshair />致命打確率</>} value={status.criticalChance} percent hidden={toggle.basicAttack[0]} />
                            <Column name={<>{criticalDamage}致命打ダメージ上昇量</>} value={status.criticalDamage} percent hidden={toggle.basicAttack[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator}><td colSpan={2} onClick={toggle.skill[1]}><div><p>スキル</p>{toggle.skill[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} value={status.skillAmp} hidden={toggle.skill[0]}>
                                <SkillAmp constant={displayed.skillAmp.constant} perLevel={displayed.skillAmp.perLevel} level={props.level} perMastery={displayed.skillAmp.perMastery} mastery={props.weaponMastery} adaptive={status.addAdaptiveTo == "amp" ? status.adaptiveStatus : undefined} equipmentRatio={displayed.skillAmp.equipmentRatio} />
                            </Column>
                            <Column name={<><Hourglass />クールダウン減少</>} value={status.cooldownReduction} percent prohibitExpand={status.cdrMax.lessThanOrEqualTo(BaseCooldownCap)} hidden={toggle.skill[0]}>
                                <InnerTable>
                                    <tr><td>最大クールダウン減少</td><td>+{status.cdrMax.sub(BaseCooldownCap).toString()}％</td></tr>
                                </InnerTable>
                            </Column>
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.penetration[1]}><td colSpan={2}><div><p>防御貫通</p>{toggle.penetration[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><ShieldSlash />防御貫通(定数)</>} value={status.armorPenetration} hidden={toggle.penetration[0]} />
                            <Column name={<><ShieldSlash />防御貫通(％)</>} value={status.armorPenetrationRatio} percent hidden={toggle.penetration[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.heal[1]}><td colSpan={2}><div><p>回復</p>{toggle.heal[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Drop />生命力吸収</>} value={status.lifeSteal} percent hidden={toggle.heal[0]} />
                            <Column name={<><Drop />ダメージ吸血</>} value={status.omnisyphon} percent hidden={toggle.heal[0]} />
                            <Column name={<><FirstAidKit />与える回復増加</>} value={status.healPower} percent hidden={toggle.heal[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator}onClick={toggle.others[1]}><td colSpan={2}><div><p>その他</p>{toggle.others[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><HandFist />行動妨害体制</>} value={status.tenacity} percent hidden={toggle.others[0]} />
                            <Column name={<><SneakerMove />移動速度</>} value={status.movementSpeed} hidden={toggle.others[0]}>
                                <MovementSpeed {...displayed.movementSpeed} movementMastery={props.movementMastery} />
                            </Column>
                            <Column name={<><Eye />視界範囲</>} value={status.visionRange} prohibitExpand={displayed.additionalVision.isZero()} hidden={toggle.others[0]}>
                                <InnerTable>
                                    <tr><td>基礎値</td><td>{BaseVision}</td></tr>
                                    <tr><td>追加値</td><td>{displayed.additionalVision.toString()}</td></tr>
                                </InnerTable>
                            </Column>
                            <Column name={<><ArrowFatLineRight />基本攻撃射程</>} value={status.basicAttackRange} prohibitExpand={displayed.basicAttackRange.weapon.isZero()} hidden={toggle.others[0]}>
                                <BasicAttackRange {...displayed.basicAttackRange} />
                            </Column>
                        </tbody>
                    </table>
                    :
                    <table>
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.toughness[1]}><td colSpan={2}><div><p>耐久 / 実効体力: {displayed.summonedEffectiveHP!.toString()}</p>{toggle.toughness[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><FirstAid weight="fill" />最大体力</>} value={status.summonedStatus!.maxHP} hidden={false} />
                            <Column name={<><Shield />防御力</>} value={status.summonedStatus!.defense} hidden={false} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.basicAttack[1]}><td colSpan={2}><div><p>攻撃</p>{toggle.basicAttack[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Sword />攻撃力</>} value={status.summonedStatus!.attackPower} hidden={false} />
                            <Column name={<>{attackSpeed}攻撃速度</>} value={status.summonedStatus!.attackSpeed} hidden={false} />
                            <Column name={<><Crosshair />致命打確率</>} value={status.summonedStatus!.criticalChance} percent hidden={false} />
                            <Column name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} value={status.summonedStatus!.skillAmp} hidden={false} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.penetration[1]}><td colSpan={2}><div><p>防御貫通</p>{toggle.penetration[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><ShieldSlash />防御貫通(定数)</>} value={status.summonedStatus!.armorPenetration} hidden={false} />
                            <Column name={<><ShieldSlash />防御貫通(％)</>} value={status.summonedStatus!.armorPenetrationRatio} percent hidden={false} />
                        </tbody>
                    </table>
                }
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;