import { host, port, username, password } from "./ssh_config.js"

import fs from "fs"
import Client from "ssh2-sftp-client"
import { stdout } from "node:process"

const remoteDir = '/var/www/www-root/data/www/silkway/assets'
const localDir = './dist/assets'

const main = async () => {
    const sftp = new Client()

    stdout.write('Connecting...')
    await sftp.connect({
        host,
        port,
        username,
        password
    })  
    stdout.write(" [OK]\r\n")

    stdout.write('Getting remote files list to remove...', )
    const filesToRemove = await sftp.list(remoteDir)
    stdout.write(" [OK]\r\n")
    
    for (const f of filesToRemove) {
        stdout.write(`Removing remote file "${f.name}" ...`, )
        const remoteFile = `${remoteDir}/${f.name}`
        await sftp.delete(remoteFile)
        stdout.write(" [OK]\r\n")
    }    

    const filesToUpload = fs.readdirSync(localDir)
    for (const f of filesToUpload) {
        stdout.write(`Uploading file "${f}" ...`, )
        const localFile = `${localDir}/${f}`
        const remoteFile = `${remoteDir}/${f}`
        await sftp.put(
            fs.createReadStream(localFile),
            remoteFile
        )
        stdout.write(" [OK]\r\n")
    }

    stdout.write('Disconnecting...', )
    await sftp.end()   
    stdout.write(" [OK]\r\n")
}

main()