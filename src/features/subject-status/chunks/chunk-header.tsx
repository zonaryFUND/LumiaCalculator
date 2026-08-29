import * as React from "react";
import table from "components/common/table.module.styl";
import { FormattedMessage } from "react-intl";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type Props = {
    intlID: string;
    additionalHead?: React.ReactNode;
    hidden: boolean;
    toggleHidden: () => void;
}

const ChunkHeader: React.FC<Props> = ({intlID, additionalHead, hidden, toggleHidden}) => {
    return (
        <tr className={table.separator} onClick={toggleHidden}>
            <td colSpan={2}><div><p><FormattedMessage id={intlID} />{additionalHead}</p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
        </tr>
    );
}

export default ChunkHeader;