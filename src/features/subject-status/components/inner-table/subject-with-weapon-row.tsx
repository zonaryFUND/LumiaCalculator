import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import Decimal from "decimal.js";

type Props = {
    subjectValue: Decimal.Value
    weaponValue?: Decimal.Value
}

// 実験体基礎値 + 武器基礎値　で示される定数値部分の表示行
const SubjectWithWeaponRow: React.FC<Props> = ({ subjectValue, weaponValue }) => {
    return (
        <tr>
            <td><FormattedMessage id="app.standard-value" /></td>
            <td>
                {<span className={table.small}><FormattedMessage id="app.subject" /></span>}{subjectValue.toString()}
                {
                    weaponValue ?
                    <>
                        <> + </>
                        <span className={table.small}><FormattedMessage id="app.weapon" /></span>{weaponValue.toString()}
                        <> = {new Decimal(subjectValue).add(weaponValue).toString()}</>
                    </> : null
                }
            </td>
        </tr>
    )
}

export default SubjectWithWeaponRow;