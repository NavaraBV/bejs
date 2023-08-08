import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { create, insert, Orama, search, count } from '@orama/orama';
import { input } from '@inquirer/prompts';
import { green, blue } from 'chalk';
import { join } from 'path';
import { path as appRootPath } from 'app-root-path';

const CSV_PATH = join(appRootPath, 'apps/orama/src/assets/movies_metadata.csv');

async function main() {
    console.log(blue('Initializing Orama database...'));
    const startTime = Date.now();
    const { db, size } = await readCsvIntoDb();
    const endTime = Date.now();

    console.log(green(`Loaded ${size} movies in ${endTime - startTime}ms`));

    await promptUser(db);
}

async function readCsvIntoDb(): Promise<{ db: Orama; size: number }> {
    const db = await create({
        schema: {
            title: 'string',
            description: 'string',
        },
    });
    const csvParser = parse({
        columns: true,
        delimiter: ',',
        relaxColumnCount: true,
    });

    createReadStream(CSV_PATH).pipe(csvParser);

    for await (const csvRecord of csvParser) {
        await insert(db, {
            title: csvRecord.title,
            description: csvRecord.overview,
        });
    }
    return { db, size: await count(db) };
}

async function promptUser(oramaDb: Orama) {
    const query = await input({ message: 'Enter your query' });

    if (query === 'exit' || query === 'q') {
        return;
    }
    const searchResult = await search(oramaDb, {
        term: query,
    });

    console.log(
        green(`Found ${searchResult.hits.length} movies in ${searchResult.elapsed.formatted}:\n`),
    );
    searchResult.hits.forEach((hit) => {
        console.log(`\t${blue('Title:')} ${hit.document.title}`);
        console.log(`\t${blue('Description:')} ${hit.document.description}`);
        console.log(`\t${blue('Search score:')} ${hit.score}\n`);
    });
    await promptUser(oramaDb);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
