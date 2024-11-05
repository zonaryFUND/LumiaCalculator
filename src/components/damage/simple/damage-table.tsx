import * as React from "react";
import BasicAttack from "./subtables/basic-attack";
import style from "../damage-table.module.styl";
import { SubjectDamageTable } from "components/subjects/damage-table";
import StandardDamage from "./subtables/rows/standard-damage";
import SubjectSkill from "./subtables/subject-skill";
import SubTable from "./subtables/subtable";
import table from "components/common/table.styl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { useIntl } from "react-intl";
import { augmentTableValues } from "components/augment/table-value";
import useItemSkills from "../use-item-skills";
import useWeaponSkill from "../use-weapon-skills";
import useTacticalSkill from "../use-tactical-skill";

type Props = {
    status: Status
    targetStatus?: Status
    config: SubjectConfig
    weaponType?: WeaponTypeID
}

const damageTable: React.FC<Props> = props => {
    const intl = useIntl();
    const subject = React.useMemo(() => 
        SubjectDamageTable[props.config.subject]({
            config: props.config, 
            status: props.status,
            intl
        })
    , [props.config.subject, props.status, props.config.skillLevels, props.weaponType]);

    const weaponSkill = useWeaponSkill(props.config);
    const itemSkills = useItemSkills(props.config);
    const tacticalSkills = useTacticalSkill(props.config);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack 
                        elements={
                            [
                                subject.basicAttack,
                                weaponSkill.basicAttackTriggered,
                                itemSkills.basicAttackTriggered
                            ].filter(array => array.length > 0)
                        }
                        status={props.status} 
                        config={props.config}
                    />
                    <SubjectSkill 
                        tables={subject.skill}
                        config={props.config}
                        status={props.status}
                    />
                    <SubTable
                        label="武器スキル"
                        elements={[weaponSkill.regular]}
                        config={props.config}
                        status={props.status}
                    />
                    <SubTable 
                        label="アイテムスキル"
                        elements={[itemSkills.regular]}
                        config={props.config}
                        status={props.status}
                    />
                    <tbody>
                        <tr className={table.separator}><td>特性</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            augmentTableValues({intl}).map(def => {
                                return <StandardDamage
                                    key={def.label}
                                    label={def.label}
                                    status={props.status}
                                    config={props.config}
                                    value={def.ratio}
                                />
                            })
                        }
                    </tbody>
                    <SubTable 
                        label="戦術スキル"
                        elements={tacticalSkills}
                        config={props.config}
                        status={props.status}
                    />
                </table>
            </div>
        </section>
    );
};

export default damageTable;