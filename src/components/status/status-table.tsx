import * as React from "react";
import { IconContext } from "@phosphor-icons/react"
import style from "./status-table.module.styl";
import SegmentedControl from "components/common/segmented-control";
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
import PullDown from "components/common/pull-down";

const status: React.FC<SubjectConfig & {status: Status}> = props => {
    const subjectNameIntlID = `Character/Name/${props.subject}`;
    const shownStatus = React.useState<string | undefined>(undefined);
    React.useEffect(() => {
        if (props.status.summoned == undefined) shownStatus[1](undefined);
    }, [props.status.summoned == undefined])

    return (
        <IconContext.Provider value={{size: 18}}>
        <section className={style.status}>
            <header>    
                <h3>ステータス</h3>
                {
                    props.status.summoned ?
                    <PullDown
                        value={{
                            intlID: true,
                            list: [subjectNameIntlID, ...props.status.summoned.map(e => e.nameIntlID)],
                            current: shownStatus[0] ?? subjectNameIntlID,
                            set: (id: string) => {
                                shownStatus[1](id == subjectNameIntlID ? undefined : id);
                            }
                        }}
                        layout="skill"
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
                            shownStatus[0] == undefined || props.status.summoned == undefined ?
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
                            <Summoned {...props} selected={shownStatus[0]!} />
                        }
                    </MaxColContext.Provider>
                </table>
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;