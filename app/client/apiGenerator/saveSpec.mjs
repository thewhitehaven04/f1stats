import * as fs from "node:fs"

const SAVE_PATH = "/app/client/apiGenerator/generated"

export const saveOpenApiSpec = async () => {
    // todo fix
    const baseUrl = process.env.API_ROOT_URL ?? "http://localhost:8000"
    const apiDirectory = process.cwd() + SAVE_PATH

    if (!fs.existsSync(apiDirectory)) {
        fs.mkdirSync(apiDirectory)
    }

    const path = `${baseUrl}/openapi.json`
    console.log('Fetching API specification from: ', path)
    fetch(path)
        .then((res) => res.text())
        .then((text) => {
            fs.writeFileSync(`${apiDirectory}/openapi.json`, text)
        })
        .catch(() => {
            throw new Error("Unable to retrieve API specification data")
        })
}

saveOpenApiSpec()
