import { sync } from 'fast-glob';
import { match } from 'micromatch'
import type { CreateBuilderArgs } from './types/CreateBuilderArgs';
import type { PrebuilderFnAsync } from './types/PrebuilderFnAsync';

// https://globster.xyz/?q=**%2F%7B*cache*%2F*%2C*cache*%7D.test.js&f=%2FUsers%2Fdoge%2Flib%2Fcache%2Findex.js%2C%2FUsers%2Fdoge%2Flib%2Fcache%2Findex.test.js%2C%2FUsers%2Fdoge%2Flib%2Fsomething%2Findex.test.js%2C%2FUsers%2Fdoge%2Flib%2Fsomething%2Fcache.test.js

const preBuilder: PrebuilderFnAsync =
    (localsObject) => {
        return async (schemaValidate) => {
            const matchingFiles = sync(schemaValidate.path);

            matchingFiles?.forEach(async file => {
                const importedFile = await import(`./${file}`)
                await schemaValidate.schema.parseAsync(importedFile)
            })

            return async (third) => {
                const selectedLocal = third ?? localsObject.defaultLocal;

                // questionable
                const [selectedMatch] = match(matchingFiles, `**/{*${selectedLocal}*/*,*${selectedLocal}*}`)
                const importedFile = await import(`./${selectedMatch}`)
                return await schemaValidate.schema.parseAsync(importedFile)
            };
        }
    }

export const createBuilder = <L extends string, LO extends string>({ defaultLocal, locals }: CreateBuilderArgs<L, LO>) => {
    return preBuilder({ defaultLocal, locals })
}