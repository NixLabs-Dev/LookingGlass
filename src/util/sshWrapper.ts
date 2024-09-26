import { NodeSSH } from 'node-ssh'
import {SSHKey, Sites} from "@/util/vars"
import { SiteType } from './util';

export async function connectToSite(siteCode: string): Promise<{ssh: NodeSSH|false; site: SiteType}> {
    const ssh = new NodeSSH()
    const site = Sites[siteCode]

   try {
     await ssh.connect({
         host: Sites[siteCode].address,
         username: 'glass',
         privateKey: SSHKey,
       })
       return {ssh, site}
   } catch (error) {
    console.error(error)
    return {
      ssh: false,
      site
    }
   }

}