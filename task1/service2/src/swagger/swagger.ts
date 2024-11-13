import fs from 'fs'
import path from 'path'

export const output = JSON.parse(fs.readFileSync(path.join(process.cwd(), `src`, `swagger`, `output.json`), { encoding: `utf-8` }))