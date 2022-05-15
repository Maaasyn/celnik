export type PreBuilderFirstArg<L extends string, LO extends string> = {
    defaultLocal: L,
    locals: LO[],
}