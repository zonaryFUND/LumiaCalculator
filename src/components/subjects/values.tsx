import * as React from "react";
import style from "./values.module.styl";

export type ValuesProps = {
    additionalInfo?: string
    parameters: {
        title: string
        values: number[]
        percent?: boolean
    }[]
}

const values: React.FC<ValuesProps & {skillLevel: number}> = props => (
    <>
        {props.additionalInfo ? <p className={style.additional}>{props.additionalInfo}</p> : null}
        <ul className={style.values}>
            {
                props.parameters.map(parameter => {
                    const values = parameter.values.reduce((prev, currentValue, index) => {
                        const p = prev.length == 0 ? prev : prev.concat(<> / </>);
                        return p.concat(index == props.skillLevel ? <span>{currentValue}{parameter.percent ? "％" : null}</span> : <>{currentValue}{parameter.percent ? "％" : null}</>);
                    }, [] as React.ReactNode[]);

                    return (
                        <li>
                            <h3>{parameter.title}</h3>
                            <p>[{values}]</p>
                        </li>
                    )
                })
            }
        </ul>
    </>
);

export default values;