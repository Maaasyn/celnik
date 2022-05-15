export type CreateBuilderArgs<L extends string = string, LO extends string = string> = {
    defaultLocal: L,
    locals: LO[],
}