import * as React from "react";
import { FirstAid, Lightning, Shield, Sword, Plus, Wind, Crosshair, 
    ArrowFatLinesUp, Hourglass, ShieldSlash, Drop, FirstAidKit, 
    HandFist, SneakerMove, Eye, ArrowFatLineRight, IconContext,
    CaretDown, CaretUp
} from "@phosphor-icons/react"
import Decimal from "decimal.js";
import style from "./status-table.module.styl";
import { useToggle } from "react-use";
import InnerTable from "components/common/inner-table";
import BasePlusPerLevel from "./expand/base-plus-per-level";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import useStatusToggle from "../subject/use-status-toggle";
import SegmentedControl from "components/common/segmented-control";
import { name } from "app-types/subject-static";
import { SummonedStatus } from "components/subjects/summoned-status";
import table from "components/common/table.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import StandardExpand from "./expand/standard";
import { FormattedMessage } from "react-intl";
import { BasicAttackReductionPerMastery, SkillReductionPerMastery } from "app-types/subject-dynamic/status/standard-values";

type ColumnProps = {
    name: React.ReactElement
    value: Decimal
    percent?: boolean
    expandTooltip?: React.ReactNode
    prohibitExpand?: boolean
    hidden: boolean
    children?: React.ReactNode
}

const Column: React.FC<ColumnProps> = props => {
    const [expand, toggleExpand] = useToggle(false);
    React.useEffect(() => {
        if (props.prohibitExpand) toggleExpand(false);
    }, [props.prohibitExpand]);

    return (
        <>
            <tr onClick={props.prohibitExpand ? undefined : toggleExpand} style={props.hidden ? {display: "none"} : undefined}>
                <td className={table.label}>{props.name}</td>
                <td className={table.value}>{props.value.toString() + (props.percent ? "%" : "")}</td>
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

const status: React.FC<SubjectConfig & {status: Status}> = props => {
    const toggle = useStatusToggle();
    const subjectName = React.useMemo(() => name(props.subject, "jp"), [props.subject]);
    const summonedName = React.useMemo(() => {
        if (SummonedStatus[props.subject] == undefined) return null;
        return SummonedStatus[props.subject].name("jp");
    }, [props.subject]);
    const shownStatus = React.useState<string | undefined>("subject");

    const effectiveToughness = React.useMemo(() => {
        return props.status.maxHP.calculatedValue.times(props.status.defense.calculatedValue.add(100).dividedBy(100));
    }, [props.status.maxHP.calculatedValue, props.status.defense.calculatedValue]);

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
                    <table>
                        <colgroup>
                            <col/>
                            <col/>
                        </colgroup>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.toughness[1]}><td colSpan={2}><div><p><FormattedMessage id="app.toughness-header" />: {effectiveToughness.toString()}</p>{toggle.toughness[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><FirstAid weight="fill" /><FormattedMessage id="status.maxhp"/></>} value={props.status.maxHP.calculatedValue} hidden={toggle.toughness[0]}>
                                <StandardExpand {...props.status.maxHP} level={props.level} digit={0} />
                            </Column>
                            <Column name={<><FirstAid /><FormattedMessage id="status.hpregen"/></>} value={props.status.hpReg.calculatedValue} hidden={toggle.toughness[0]}>
                                <StandardExpand {...props.status.hpReg} level={props.level} digit={2} />
                            </Column>
                            <Column name={<><Shield /><FormattedMessage id="status.defense"/></>} value={props.status.defense.calculatedValue} hidden={toggle.toughness[0]}>
                                <StandardExpand {...props.status.defense} level={props.level} digit={0} />
                            </Column>
                            <Column name={<>{basicAttackRecuction}<FormattedMessage id="status.basic-attack-damage-reduction" /></>} value={props.status.basicAttackReduction.calculatedValue} percent hidden={toggle.toughness[0]}>
                                <InnerTable>
                                    <Mastery perMastery={props.status.basicAttackReduction.perMastery!} name={<FormattedMessage id="status.defense-mastery" />} mastery={props.defenseMastery} />
                                </InnerTable>
                            </Column>
                            <Column name={<>{skillRecuction}<FormattedMessage id="status.skill-damage-reduction" /></>} value={props.status.skillReduction.calculatedValue} percent hidden={toggle.toughness[0]}>
                                <InnerTable>
                                    <Mastery perMastery={props.status.skillReduction.perMastery!} name={<FormattedMessage id="status.defense-mastery" />} mastery={props.defenseMastery} />
                                    {props.status.skillReduction.equipment ? <Equipment {...props.status.skillReduction.equipment} level={props.level} percent={true} /> : null} 
                                </InnerTable>
                            </Column>
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.stamina[1]}><td colSpan={2}><div><p><FormattedMessage id="app.sp" /></p>{toggle.stamina[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Lightning weight="fill" /><FormattedMessage id="status.maxsp" /></>} value={props.status.maxSP.calculatedValue} hidden={toggle.stamina[0]}>
                                <StandardExpand {...props.status.maxSP} level={props.level} digit={2} />
                            </Column>
                            <Column name={<><Lightning /><FormattedMessage id="status.spregen"/></>} value={props.status.spReg.calculatedValue} hidden={toggle.stamina[0]}>
                                <StandardExpand {...props.status.spReg} level={props.level} digit={2} />
                            </Column>
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.basicAttack[1]}><td colSpan={2}><div><p><FormattedMessage id="app.basic-attack" /></p>{toggle.basicAttack[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Sword /><FormattedMessage id="status.attack-power" /></>} value={props.status.attackPower.calculatedValue} hidden={toggle.basicAttack[0]}>
                                <InnerTable>
                                    <BasePlusPerLevel 
                                        {...props.status.attackPower} 
                                        level={props.level} 
                                        label={<FormattedMessage id="app.subject" />}
                                        multiplierLabel={<FormattedMessage id="app.level" />}
                                        digit={0}
                                    />
                                    {
                                        props.status.attackPower.equipment ?
                                        <Equipment
                                            {...props.status.attackPower.equipment}
                                            level={props.level}
                                        />
                                        : null
                                    }
                                    {
                                        props.status.attackPower.perMastery ?
                                        <Mastery 
                                            perMastery={props.status.attackPower.perMastery} 
                                            mastery={props.weaponMastery}
                                            name={<FormattedMessage id="status.weapon-mastery" />}
                                        />
                                        : null
                                    }
                                    {
                                        props.status.attackPower.equipment?.adaptive ?
                                        <tr><td><FormattedMessage id="status.adaptive"/></td><td>{props.status.attackPower.equipment.adaptive.toString()}</td></tr>
                                        : null
                                    }
                                </InnerTable>
                            </Column>
                            <Column name={<>{basicAttackAmp}<FormattedMessage id="status.basic-attack-amp" /></>} value={props.status.basicAttackAmp.calculatedValue} percent prohibitExpand={props.status.basicAttackAmp.calculatedValue.isZero()} hidden={toggle.basicAttack[0]}>
                                <InnerTable>
                                    <Mastery perMastery={props.status.basicAttackAmp.perMastery!} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                                    {
                                        props.status.basicAttackAmp.equipment?.perLevel ? 
                                        <tr>
                                            <td><FormattedMessage id="app.equipment" /></td>
                                            <td>{props.status.basicAttackAmp.equipment.perLevel.toString()}% x <span className={table.small}><FormattedMessage id="app.level" /></span>{props.weaponMastery}
                                            <> = {props.status.basicAttackAmp.equipment.perLevel.times(props.level).toString()}%</></td>
                                        </tr> 
                                        : null
                                    }
                                </InnerTable>
                            </Column>
                            <Column name={<>{attackSpeed}<FormattedMessage id="status.attack-speed" /></>} value={props.status.attackSpeed.calculatedValue} hidden={toggle.basicAttack[0]}>
                                <InnerTable>
                                    <tr>
                                        <td><FormattedMessage id="app.standard-value" /></td>
                                        <td>
                                            {
                                                props.status.attackSpeed.equipment?.constant ?
                                                <>
                                                    <span className={table.small}><FormattedMessage id="app.standard-value" /></span>{props.status.attackSpeed.base?.toString()}
                                                    <> + </>
                                                    <span className={table.small}><FormattedMessage id="app.weapon" /></span>{props.status.attackSpeed.equipment.constant.toString()}
                                                    <> = </>
                                                    {props.status.attackSpeed.equipment.constant.add(props.status.attackSpeed.base ?? 0).cut(3, "floor").toString()}
                                                </>    
                                                :
                                                <><span className={table.small}><FormattedMessage id="app.standard-value" /></span>{props.status.attackSpeed.base?.toString()}</>
                                            }                                            
                                        </td>
                                    </tr>
                                    {
                                        props.status.attackSpeed.overrideAdditional ?
                                        <tr>
                                            <td><FormattedMessage id={props.status.attackSpeed.overrideAdditional.nameKey} /></td>
                                            <td>{props.status.attackSpeed.overrideAdditional.ratio?.toString()}%</td>
                                        </tr>
                                        : null
                                    }
                                    {
                                        props.status.attackSpeed.equipment?.ratio?.greaterThan(0) ?
                                        <tr>
                                            <td><FormattedMessage id="app.equipment" /></td>
                                            <td>{props.status.attackSpeed.equipment.ratio.toString()}%</td>
                                        </tr>
                                        : null
                                    }
                                    {
                                        props.status.attackSpeed.perMastery ? 
                                        <Mastery perMastery={props.status.attackSpeed.perMastery} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                                        : null
                                    }
                                    {
                                        props.status.attackSpeed.overrideFix ?
                                        <tr className={style.fixedvalue}><td><FormattedMessage id={props.status.attackSpeed.overrideFix.nameKey} /></td><td>{props.status.attackSpeed.overrideFix.value.toString()}</td></tr>
                                        : null
                                    }
                                </InnerTable>
                            </Column>
                            <Column name={<><Crosshair /><FormattedMessage id="status.critical-chance" /></>} value={props.status.criticalChance.calculatedValue} percent hidden={toggle.basicAttack[0]} />
                            <Column name={<>{criticalDamage}<FormattedMessage id="status.critical-damage" /></>} value={props.status.criticalDamage.calculatedValue} percent hidden={toggle.basicAttack[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator}><td colSpan={2} onClick={toggle.skill[1]}><div><p><FormattedMessage id="app.skill" /></p>{toggle.skill[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><ArrowFatLinesUp weight="fill" /><FormattedMessage id="status.skill-amp" /></>} value={props.status.skillAmp.calculatedValue} prohibitExpand={props.status.skillAmp.calculatedValue.isZero()} hidden={toggle.skill[0]}>
                                <InnerTable>
                                    <Equipment 
                                        {...props.status.skillAmp.equipment}
                                        level={props.level}
                                        label={<FormattedMessage id="app.constant-value" />}
                                    />
                                    {
                                        props.status.skillAmp.overrideAdditional ?
                                        <tr>
                                            <td><FormattedMessage id={props.status.skillAmp.overrideAdditional.nameKey} /></td>
                                            <td>{props.status.skillAmp.overrideAdditional.value?.toString()}</td>
                                        </tr>
                                        : null
                                    }
                                    {
                                        props.status.skillAmp.equipment?.adaptive ?
                                        <tr><td><FormattedMessage id="status.adaptive"/></td><td>{props.status.skillAmp.equipment.adaptive.toString()}</td></tr>
                                        : null
                                    }
                                    {
                                        props.status.skillAmp.equipment?.ratio ?
                                        <tr><td>%<FormattedMessage id="status.skill-amp" /></td><td>{props.status.skillAmp.equipment.ratio.toString()}%</td></tr>
                                        : null
                                    }
                                    {
                                        props.status.skillAmp.perMastery ? 
                                        <Mastery perMastery={props.status.skillAmp.perMastery} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                                        : null
                                    }
                                </InnerTable>
                            </Column>
                            <Column name={<><Hourglass /><FormattedMessage id="status.cooldown-reduction" /></>} value={props.status.cooldownReduction.calculatedValue} percent prohibitExpand={props.status.cooldownReduction.cap.isZero()} hidden={toggle.skill[0]}>
                                <InnerTable>
                                    <tr><td><FormattedMessage id="status.max-cooldown-reduction" /></td><td>+{props.status.cooldownReduction.cap.toString()}%</td></tr>
                                </InnerTable>
                            </Column>
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.penetration[1]}><td colSpan={2}><div><p><FormattedMessage id="status.armor-penetration" /></p>{toggle.penetration[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-constant" /></>} value={props.status.armorPenetration.calculatedValue} hidden={toggle.penetration[0]} />
                            <Column name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-ratio" /></>} value={props.status.armorPenetrationRatio.calculatedValue} percent hidden={toggle.penetration[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator} onClick={toggle.heal[1]}><td colSpan={2}><div><p><FormattedMessage id="app.heal" /></p>{toggle.heal[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><Drop /><FormattedMessage id="status.lifesteal" /></>} value={props.status.lifeSteal.calculatedValue} percent hidden={toggle.heal[0]} />
                            <Column name={<><Drop /><FormattedMessage id="status.omnisyphon" /></>} value={props.status.omnisyphon.calculatedValue} percent hidden={toggle.heal[0]} />
                            <Column name={<><FirstAidKit /><FormattedMessage id="status.heal-power" /></>} value={props.status.healPower.calculatedValue} percent hidden={toggle.heal[0]} />
                        </tbody>
                        <tbody>
                            <tr className={table.separator}onClick={toggle.others[1]}><td colSpan={2}><div><p><FormattedMessage id="app.others" /></p>{toggle.others[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><HandFist /><FormattedMessage id="status.tenacity" /></>} value={props.status.tenacity.calculatedValue} percent hidden={toggle.others[0]} />
                            <Column name={<><SneakerMove /><FormattedMessage id="status.movement-speed" /></>} value={props.status.movementSpeed.calculatedValue} hidden={toggle.others[0]}>
                                <InnerTable>
                                    <tr><td><FormattedMessage id="app.subject" /></td><td>{props.status.movementSpeed.base?.toString()}</td></tr>
                                    <Equipment 
                                        {...props.status.movementSpeed.equipment}
                                        level={props.level}
                                    />
                                    <Mastery perMastery={props.status.movementSpeed.perMastery!} name={<FormattedMessage id="status.movement-mastery" />} mastery={props.movementMastery} />
                                </InnerTable>
                            </Column>
                            <Column name={<><Eye /><FormattedMessage id="status.vision" /></>} value={props.status.visionRange.calculatedValue} prohibitExpand={props.status.visionRange.equipment == undefined} hidden={toggle.others[0]}>
                                <InnerTable>
                                    <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.visionRange.base?.toString()}</td></tr>
                                    <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.visionRange.equipment?.constant?.toString()}</td></tr>
                                </InnerTable>
                            </Column>
                            <Column name={<><ArrowFatLineRight />基本攻撃射程</>} value={props.status.basicAttackRange.calculatedValue} prohibitExpand={props.status.basicAttackRange.equipment == undefined} hidden={toggle.others[0]}>
                                <InnerTable>
                                    <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.basicAttackRange.base?.toString()}</td></tr>
                                    <tr><td><FormattedMessage id="app.weapon" /></td><td>{props.status.basicAttackRange.equipment?.constant?.toString()}</td></tr>
                                    {props.status.basicAttackRange.equipment?.ratio ? <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.basicAttackRange.equipment.ratio.toString()}</td></tr> : null}
                                    {
                                        props.status.basicAttackRange.overrideAdditional ?
                                        <tr>
                                            <td><FormattedMessage id={props.status.basicAttackRange.overrideAdditional.nameKey} /></td>
                                            <td>{props.status.basicAttackRange.overrideAdditional.value?.toString()}</td>
                                        </tr>
                                        : null
                                    }
                                </InnerTable>
                            </Column>
                        </tbody>
                    </table>
                {
                    /*
                        <tbody>
                            <tr className={table.separator}onClick={toggle.others[1]}><td colSpan={2}><div><p>その他</p>{toggle.others[0] ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
                            <Column name={<><HandFist />行動妨害耐性</>} value={status.tenacity} percent hidden={toggle.others[0]} />
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
                            <Column name={<><ShieldSlash />防御貫通(%)</>} value={status.summonedStatus!.armorPenetrationRatio} percent hidden={false} />
                        </tbody>
                    </table>
                    */
                }
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;