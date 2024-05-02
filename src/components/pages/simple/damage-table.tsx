import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttack from "components/pages/simple/basic-attack";
import style from "./damage-table.module.styl";
import { SubjectDamageTable } from "components/subjects/damage-table";
import { SubjectConfig } from "components/subject/use-subject-config";
import SkillDamage from "./skill-damage";
import table from "components/common/table.styl";
import { WeaponTypeID } from "@app/entity/equipment";

type Props = {
    status: Status
    config: SubjectConfig
    weaponType?: WeaponTypeID
}

const damageTable: React.FC<Props> = props => {
    const definition = React.useMemo(() => SubjectDamageTable[props.config.subject], [props.config.subject]);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={props.status} table={definition} weaponType={props.weaponType} />
                    <tbody>
                        <tr className={table.separator}><td colSpan={3}>実験体スキル</td><td>ダメージ / 効果量</td></tr>
                        {
                            definition.skill.map((array, index) => 
                                <React.Fragment key={index}>
                                {
                                    index == 0 ? null :
                                    <tr className={table.border}><td colSpan={4}></td></tr>
                                }
                                {
                                    array.map(s => 
                                        <SkillDamage key={s.label} status={props.status} config={props.config} {...s} />
                                    )
                                }
                                </React.Fragment>
                            )
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td colSpan={3}>武器スキル</td><td>ダメージ / 効果量</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default damageTable;
