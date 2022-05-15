import type { PreBuilderFirstArg } from "./PreBuilderFirstArg";
import type { PreBuilderSecondArg } from "./PreBuilderSecondArg";
import type { PreBuilderThirdArg } from "./PreBuilderThirdArg";

export type PrebuilderFnAsync = <L extends string, LO extends string>(localsObject: PreBuilderFirstArg<L, LO>) =>
    <T>(second: PreBuilderSecondArg<T>) =>
        Promise<(third?: PreBuilderThirdArg<L, LO>) => Promise<T>>