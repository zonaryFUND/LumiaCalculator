import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import * as React from "react";

type Props = {
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

export const ValueContext = React.createContext<Props | undefined>(undefined);

export function useValueContext(): Props {
    return React.useContext(ValueContext)!;
}

export function useValueContextOptional(): Partial<Props> & {showEquation: boolean} {
    return React.useContext(ValueContext) ?? {showEquation: false};
}