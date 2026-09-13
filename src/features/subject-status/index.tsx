import * as React from "react";
import { IconContext } from "@phosphor-icons/react"
import { Tooltip, TooltipRefProps } from "react-tooltip";
import { FormattedMessage } from "react-intl";
import style from "./index.module.styl";
import table from "components/common/table.module.styl";
import Toughness from "./chunks/00_toughness";
import BasicAttack from "./chunks/02_basicattack";
import Skill from "./chunks/03_skill";
import Penetration from "./chunks/04_penetration";
import Heal from "./chunks/05_heal";
import Misc from "./chunks/06_misc";
import Summoned from "./chunks/10_summoned";
import { MaxColContext, TableRowTooltipContext } from "components/common/table-row";
import PullDown from "components/common/pull-down";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";

const status: React.FC = () => {
    const subject = useSubjectStateStore(s => s.config.subject);
    const status = useSubjectStateStore(s => s.status);
    const uiType = useResponsiveUIType();
    const tooltipRef = React.useRef<TooltipRefProps>(null);

    const subjectNameIntlID = `Character/Name/${subject}`;
    const shownStatus = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (status.summoned == undefined) shownStatus[1](undefined);
    }, [status.summoned == undefined])

    return (
        <IconContext.Provider value={{size: 18}}>
        <TableRowTooltipContext.Provider value={tooltipRef}>
        {/* 各ステータス項目の説明ツールチップ。PC版はホバー（長めのdelayShow）で自動表示、モバイル版は
            クリック起因の自動表示を無効化し、`TableRowTooltipContext`経由でダブルタップ時に明示的に
            開く（`components/common/table-row.tsx`参照） */}
        <Tooltip
            id="table-row-description"
            ref={tooltipRef}
            className={style.tooltip}
            delayShow={600}
            openEvents={uiType == "mobile" ? {click: false} : undefined}
            render={({ content }) => content ? <FormattedMessage id={content} /> : null}
        />
        <section className={style.status}>
            <header>
                <h3>
                    ステータス
                    <span>
                        {
                            uiType == "mobile" ? "タップで詳細表示" : "クリックで詳細表示"
                        }
                        <br />
                        {
                            uiType == "mobile" ? "ダブルタップでツールチップを表示" : "マウスオーバーでツールチップを表示"
                        }
                    </span>
                </h3>
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
        </TableRowTooltipContext.Provider>
        </IconContext.Provider>
    )
}

export default status;