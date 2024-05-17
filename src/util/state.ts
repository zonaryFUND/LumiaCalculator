import React from "react";

export type StateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
export type StateWrapped<T> = {
    [K in keyof T]: StateProps<T[K]>
}
