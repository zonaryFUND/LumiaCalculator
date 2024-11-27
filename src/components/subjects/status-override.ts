import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";

export type StatusOverrideFunc = (status: StatusBeforeCalculation, config: SubjectConfig, hp: number) => StatusBeforeCalculation;
