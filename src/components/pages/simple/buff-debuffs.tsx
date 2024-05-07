import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.module.styl";

type Props = {
    hideHeader?: boolean
}

const buffDebuffs: React.FC<Props> = props => {
    return (
        <div className={index.row}>
            {
                props.hideHeader ? null :
                <header>
                    <h1>バフ・デバフ</h1>
                </header>
            }
            <hr />
        </div>
    )
};

export default buffDebuffs;