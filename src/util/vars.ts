"use server";
import { SiteArrrayType } from "./util"
import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const SSHKey =  process.env.SSH_KEY

const Sites: SiteArrrayType = {
    "rtr-edge.hopky": {
        name: "Hopkinsville, KY",
        address: "74.113.97.1",
        hostname: "rtr-edge.hopky.nixlabs.dev"
    },
    "rtr-edge.amsnl": {
        name: "Amsterdam, NL",
        address: "45.146.4.91",
        hostname: "rtr-edge.amsnl.nixlabs.dev"
    }

}

export {SSHKey, Sites}