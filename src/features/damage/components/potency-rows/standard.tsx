import * as React from "react";
import table from "components/common/table.module.styl";
import { useToggle } from "react-use";
import InnerTable from "components/common/inner-table";

type Props = {
    label: React.ReactNode;
    value: React.ReactNode;
    valueClass?: string;
    subtable?: React.ReactNode;
}

const Standard: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    return (
        <>
            <tr onClick={props.subtable ? toggleExpand : undefined}>
                <td>{props.label}</td>
                <td colSpan={3} className={props.valueClass}>{props.value}</td>
            </tr>
            {
                props.subtable ?
                <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                    <InnerTable>
                        {props.subtable}
                    </InnerTable>
                </td></tr> :
                null
            }
        </>
    )
}

export default Standard;