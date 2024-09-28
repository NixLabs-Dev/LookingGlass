import { Sites } from "./vars"

const REGEX_VALID_IPv4      = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/
const REGEX_VALID_IPv6      = /^([0-9a-fA-F]{1,4}:){1,7}([0-9a-fA-F]{1,4}|:)(:(:[0-9a-fA-F]{1,4}){1,7})?(\/(12[0-8]|[0-9]{1,2}))?$/
const REGEX_VALID_HOSTNAME  = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
const REGEX_EXTRACT_ADDRESS = /^([0-9a-fA-F:.]+)/
const REGEX_EXTRACT_CIDR    = /\/([0-9]+)$/

export type HostType = {
    type: "4"|"6"|"HOST";
    host: string;
    mask: string|null;
}

export type RouterType = {
    name: string; 
    address:string; 
    code: string;
    hostname: string;
}

export const errors = {
    noConnect: "Error connecting to router.",
    noExec: "Command failed to execute.",
    noRouter: "The specified router does not exist.",
    validation: {
        invalidSite: "Invalid site identifier.",
        invalidHost: "Property 'host' is invalid.",
        hostRequired: "Property 'host' is required.",
        noHostname: "Only host must be an address or subnet, no hostnames!"
    }
}

export function getRouter(code: string){
    const site = Sites.filter(site => site.code == code)[0]

    if(!site){
        return false
    }else{
        return site
    }

}
export function HostType(input: string): HostType|false {
    if(REGEX_VALID_IPv4.test(input)){
        return {
            type: "4",
            host: REGEX_EXTRACT_ADDRESS.exec(input)![0],
            mask: REGEX_EXTRACT_CIDR.test(input) ? REGEX_EXTRACT_CIDR.exec(input)![0] : null
        }
    }else if(REGEX_VALID_IPv6.test(input)){
        return {
            type: "6",
            host: REGEX_EXTRACT_ADDRESS.exec(input)![0],
            mask: REGEX_EXTRACT_CIDR.test(input) ? REGEX_EXTRACT_CIDR.exec(input)![0] : null
        }
    }else if(REGEX_VALID_HOSTNAME.test(input)){
        return {
            type: "HOST",
            host: input,
            mask: null
        }
    }

    return false
}