import { RouterType } from "./util"
import { loadEnvConfig } from '@next/env'

import routers from "./routers.json"
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const SSHKey =  process.env.SSH_KEY

const Sites: RouterType[] = routers

export {SSHKey, Sites}