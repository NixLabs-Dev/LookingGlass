import { NodeSSH } from 'node-ssh'
import {SSHKey, Sites} from "@/util/vars"
import { getRouter, RouterType } from './util';

export async function connectToSite(siteCode: string): Promise<{ssh: NodeSSH|false; router: RouterType|false}> {
    const ssh = new NodeSSH()
    const router: RouterType|false = getRouter(siteCode)

    if(!router){
      return {
        ssh: false,
        router: false
      }
    }

   try {
     await ssh.connect({
         host: router.address,
         username: 'glass',
         privateKey: SSHKey,
       })
       return {ssh, router: router}
   } catch (error) {
    console.error(error)
    return {
      ssh: false,
      router: router
    }
   }

}