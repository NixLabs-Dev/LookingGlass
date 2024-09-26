import { Sites } from '@/util/vars';
import {connectToSite} from '@/util/sshWrapper'
import type { NextApiRequest, NextApiResponse } from 'next'
import {isIPv4, isIPv6} from 'net'
import { errors, HostType } from '@/util/util';
import { CommandAPIResponse } from '@/util/api';

type RequestData = {
  site: string;
  host: string;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommandAPIResponse>
) {
  const { site: siteCode, host } = req.query as RequestData;
  
  if(!host){
    return res.status(422).json({ error: errors.validation.hostRequired, success: false, timestamp: Date.now().toString() })
  }
  const parsedInput = HostType(host)

  if(!(siteCode in Sites)){
    return res.status(422).json({ error: errors.validation.invalidSite, success: false, timestamp: Date.now().toString() })
  }
  if(!parsedInput){
    return res.status(422).json({ error: errors.validation.invalidHost, success: false, timestamp: Date.now().toString() })
  }
  if(parsedInput.type == "HOST"){
    return res.status(422).json({ error: errors.validation.noHostname, success: false, timestamp: Date.now().toString() })
  }

  const {ssh, site} = await connectToSite(siteCode)
  if(!ssh){
    return res.status(422).json({ error: errors.noConnect, success: false, timestamp: Date.now().toString() })
  }

  try {
    if(parsedInput.type == "4"){
        const data = await ssh.exec("/opt/vyatta/bin/vyatta-op-cmd-wrapper", ['show', 'bgp', 'ipv4', host])
        res.status(200).json({ output: {
          command: `show bgp ipv4 ${host}`,
          hostname: site.hostname,
          rawCommandOutput: data
        }, success: true, timestamp: Date.now().toString() })
    } else if(parsedInput.type == "6"){
      const data = await ssh.exec("/opt/vyatta/bin/vyatta-op-cmd-wrapper", ['show', 'bgp', 'ipv6', host])
      res.status(200).json({ output: {
        command: `show bgp ipv6 ${host}`,
        hostname: site.hostname,
        rawCommandOutput: data
      }, success: true, timestamp: Date.now().toString() })
    }

  } catch (error) {
    res.status(500).json({ error: errors.noExec, success: false, timestamp: Date.now().toString() })
  }
  
}