# Celnik (Work in progress)

Library for typed internationalisation (i18n).

Right now it doesn't have a nice error handling, but if your content doesn't match the schema, it will throw an error when awaiting schemaBuilder result.

## Usage

More examples can be seen on examples folder

```ts

import { z } from "zod";
import { createBuilder } from "..";

const main = async () => {
    const schemaBuilder = createBuilder({
        defaultLocal: "en",
        locals: ["en", "pl", "it"]
    })

    const heroLocals = await schemaBuilder({
        path: "content/hero/**/*.json", //glob pattern support 
        schema: z.object({
            title: z.string(),
            year: z.number(),
            description: z.string(),
        })
    });

    const heroContent = await heroLocals('en');

    const itsTyped = heroContent.description; //full intelisense support and type checking
}

```

## Sugested file structure for content

```bash
# Folder local
.
└─── content
     └─── hero
        │   ├── $schema.json
        ├── en
        │   └── hero.json
        ├── hero.json
        └── pl
            └── hero.json

# Filename local

.
└─── content
     └─── hero
        ├── $schema.json
        ├── hero.en.json
        ├───hero.pl.json
        └── hero.json

```