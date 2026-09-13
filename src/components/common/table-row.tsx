import * as React from "react";
import { useToggle } from "react-use";
import type { TooltipRefProps } from "react-tooltip";
import style from "./table.module.styl";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";

export const MaxColContext = React.createContext(0);

/**
 * 行の説明ツールチップ（`descriptionIntlID`）を表示する共有`Tooltip`（react-tooltip）インスタンスへの参照。
 * PC版はホバーで自動的に開くためこのrefを使わないが、モバイル版は「シングルタップ＝行の開閉
 * （`expand`）」に割り当て済みのため、ダブルタップを検出した時点でこのrefを通じて明示的に`.open()`を
 * 呼び出す（`Props.descriptionIntlID`のdocコメント参照）。Providerは呼び出し側
 * （例: `features/subject-status/index.tsx`）が用意する
 */
export const TableRowTooltipContext = React.createContext<React.RefObject<TooltipRefProps | null> | null>(null);

type Props = {
    content: React.ReactNode
    expand?: React.ReactNode
    isHidden?: boolean
    /**
     * この行の説明ツールチップの内容を示すreact-intlメッセージID。指定すると行全体に
     * `data-tooltip-id`・`data-tooltip-content`（このID）を付与し、PC版は長めのホバーで自動表示、
     * モバイル版はダブルタップで表示する（`TableRowTooltipContext`経由で共有`Tooltip`の`.open()`を呼ぶ）。
     *
     * モバイル版でダブルタップにしているのは、シングルタップが既に`expand`の開閉に割り当てられているため
     * （`expand`が未指定の行でも、他の行との一貫性のためシングルタップでは表示しない）
     */
    descriptionIntlID?: string
}

const tableRow: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const maxCol = React.useContext(MaxColContext);
    const uiType = useResponsiveUIType();
    const tooltipRef = React.useContext(TableRowTooltipContext);
    const clickCountRef = React.useRef(0);
    const rowIdRef = React.useRef<string>();
    if (rowIdRef.current == undefined) rowIdRef.current = `table-row-tooltip-${Math.random().toString(36).slice(2)}`;

    React.useEffect(() => {
        if (props.expand == undefined) toggleExpand(false);
    }, [props.expand == undefined]);

    const hasDescription = props.descriptionIntlID != undefined;

    const onClick = React.useMemo(() => {
        if (props.expand == undefined && !hasDescription) return undefined;

        // PC版、またはモバイル版で説明ツールチップを持たない行は、従来通りシングルクリックで開閉する
        if (uiType != "mobile" || !hasDescription) {
            return props.expand == undefined ? undefined : toggleExpand;
        }

        // モバイル版、かつ説明ツールチップを持つ行はダブルタップで区別する
        return () => {
            clickCountRef.current++;
            if (clickCountRef.current >= 2) return;

            setTimeout(() => {
                if (clickCountRef.current == 1) {
                    if (props.expand != undefined) toggleExpand();
                } else {
                    tooltipRef?.current?.open({ anchorSelect: `#${rowIdRef.current}` });
                }
                clickCountRef.current = 0;
            }, 200);
        };
    }, [props.expand == undefined, hasDescription, uiType]);

    return (
        <>
            <tr
                id={hasDescription ? rowIdRef.current : undefined}
                data-tooltip-id={hasDescription ? "table-row-description" : undefined}
                data-tooltip-content={props.descriptionIntlID}
                onClick={onClick}
                style={props.isHidden ? {display: "none"} : undefined}
            >
                {props.content}
            </tr>
            {
                props.expand ?
                <tr className={style.expand} style={expand && props.isHidden != true ? undefined : {display: "none"}}><td colSpan={maxCol}>{props.expand}</td></tr> :
                null
            }
        </>
    );
};

export default tableRow;
