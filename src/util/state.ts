import React from "react";

export type StateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
