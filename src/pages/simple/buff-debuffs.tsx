import { SubjectID } from "app-types/subject-static/id";
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
            <p>作成中</p>
        </div>
    )
};

export default buffDebuffs;