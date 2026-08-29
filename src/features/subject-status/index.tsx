import * as React from "react";
import { IconContext } from "@phosphor-icons/react"
import style from "./index.module.styl";
import table from "components/common/table.module.styl";
import Toughness from "./chunks/00_toughness";
import BasicAttack from "./chunks/02_basicattack";
import Skill from "./chunks/03_skill";
import Penetration from "./chunks/04_penetration";
import Heal from "./chunks/05_heal";
import Misc from "./chunks/06_misc";
import Summoned from "./chunks/10_summoned";
import { MaxColContext } from "components/common/table-row";
import PullDown from "components/common/pull-down";
import { useSubjectStateStore } from "@app/features/subject-config/store";

const status: React.FC = () => {
    const subject = useSubjectStateStore(s => s.config.subject);
    const status = useSubjectStateStore(s => s.status);

    const subjectNameIntlID = `Character/Name/${subject}`;
    const shownStatus = React.useState<string | undefined>(undefined);
    
    React.useEffect(() => {
        if (status.summoned == undefined) shownStatus[1](undefined);
    }, [status.summoned == undefined])

    return (
        <IconContext.Provider value={{size: 18}}>
        <section className={style.status}>
            <header>    
                <h3>ステータス</h3>
                {
                    status.summoned ?
                    <PullDown
                        value={{
                            intlID: true,
                            list: [subjectNameIntlID, ...status.summoned.map(e => e.nameIntlID)],
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
                            shownStatus[0] == undefined || status.summoned == undefined ?
                            <>
                                <Toughness />
                                <BasicAttack />
                                <Skill />
                                <Penetration />
                                <Heal />
                                <Misc />
                            </>
                            :
                            <Summoned selectedSummonedObject={shownStatus[0]!} />
                        }
                    </MaxColContext.Provider>
                </table>
            </div>
        </section>
        </IconContext.Provider>
    )
}

export default status;