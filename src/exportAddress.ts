// src/exportFromDune.ts

import { DuneClient } from '@cowprotocol/ts-dune-client';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export async function exportFromDune(): Promise<void> {
  const duneApiKey = process.env.DUNE_API_KEY;
  if (!duneApiKey) {
    throw new Error('DUNE_API_KEY is not defined in the environment variables');
  }

  const queryID = 3531949; // https://dune.com/queries/3531949
  const client = new DuneClient(duneApiKey);
  const resultRes = await client.refresh(queryID);

  if (!resultRes.result) {
    throw new Error('Failed to execute Dune query');
  }

  const data = resultRes.result.rows
    .map((row) => {
      // Need to change correct field name in your query
      return `${row.address}`;
    })
    .join('\n');

  const csvData = ['address', data].join('\n');

  const outputDir = path.join(process.cwd(), 'output');
  const outputFile = path.join(outputDir, 'dune_export.csv');

  fs.writeFileSync(outputFile, csvData);
  console.log(`Exported data saved to: ${outputFile}`);
}
