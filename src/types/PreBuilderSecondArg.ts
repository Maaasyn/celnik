import type { Schema } from "zod";

export type PreBuilderSecondArg<T> = {
    path: string,
    schema: Schema<T>,
}