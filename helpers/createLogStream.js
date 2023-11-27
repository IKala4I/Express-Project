import {fileURLToPath} from "url"
import {dirname} from "path"
import path from "path"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const logsDirectory = path.join(__dirname, '../logs')

export const createLogStream = (route) => {
    const logFileName = `${route}.log`
    return fs.createWriteStream(path.join(logsDirectory, logFileName), {flags: 'a'})
}