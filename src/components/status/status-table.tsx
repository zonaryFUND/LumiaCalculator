import * as React from "react";
import { IconContext } from "@phosphor-icons/react"
import style from "./status-table.module.styl";
import SegmentedControl from "components/common/segmented-control";
import { name } from "app-types/subject-static";
import { SummonedStatus } from "components/subjects/summoned-status";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { useIntl } from "react-intl";
import Toughness from "./chunks/00_toughness";
import Sp from "./chunks/01_sp";
import BasicAttack from "./chunks/02_basicattack";
import Skill from "./chunks/03_skill";
import Penetration from "./chunks/04_penetration";
import Heal from "./chunks/05_heal";
import Misc from "./chunks/06_misc";
import Summoned from "./chunks/10_summoned";
import { MaxColContext } from "components/common/table-row";

const status: React.FC<SubjectConfig & {status: Status}> = props => {
    const subjectName = React.useMemo(() => name(props.subject, "jp"), [props.subject]);
    const intl = useIntl();
    const summonedName = React.useMemo(() => {
        const module = SummonedStatus[props.subject];
        if (module == undefined) return undefined;
        return intl.formatMessage({id: module.nameKey});
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
                        segments={[{title: subjectName, value: "subject"}, {title:  summonedName, value: "summoned"}]} 
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
                    <MaxColContext.Provider value={2}>
                        {
                            shownStatus[0] == "subject" ?
                            <>
                                <Toughness {...props} />
                                <Sp {...props} />
                                <BasicAttack {...props} />
                                <Skill {...props} />
                                <Penetration {...props} />
                                <Heal {...props} />
                                <Misc {...props} />
                            </>
                            :
                            <Summoned {...props} />
                        }
                    </MaxColContext.Provider>
                </table>
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;