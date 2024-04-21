import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.styl";

type Props = {
    subject: StateProps<SubjectID>
}

const buffDebuffs: React.FC = props => {
    return (
        <div className={index.row}>
            <header>
                <h1>バフ・デバフ</h1>
            </header>
            <hr />
        </div>
    )
};

export default buffDebuffs;