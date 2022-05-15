import { z } from "zod";
import { createBuilder } from "..";

const main = async () => {
    const schemaBuilder = createBuilder({
        defaultLocal: "en",
        locals: ["en", "pl", "it"]
    })

    const heroLocals = await schemaBuilder({
        path: "content/hero/**/*.json",
        schema: z.object({
            title: z.string(),
            year: z.number(),
            description: z.string(),
        })
    });

    const heroContent = await heroLocals('en');


    // const jsonSchema = zodToJsonSchema(
    //     z.object({
    //         $schema: z.string(),
    //     }).merge(
    //         z.object({
    //             home: z.string().min(100).max(1000),
    //             about: z.string(),
    //             contact: z.string(),
    //             login: z.string(),
    //             logout: z.string(),
    //             register: z.string(),
    //             dashboard: z.string(),
    //             profile: z.string(),
    //             settings: z.string(),
    //             search: z.string(),
    //             date: z.date()
    //         }))
    //     , "MenuSchema")

}

main();