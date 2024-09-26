"use client";
import NavBar from "@/components/NavBar";
import { CommandAPIResponse } from "@/util/api";
import { act, useEffect, useState } from "react";
import {Sites} from "@/util/vars"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json());



type ActionState = "ping"|"trace"|"route"
type ErrorType   = string|null

export default function Home() {

  const { data, error, isLoading } = useSWR('/api/routers', fetcher)

  //General State
  const [formError, setError] = useState<ErrorType>(null)
  const [isWaitingRouterResponse, setIsWaitingRouterResponse] = useState(false)

  //Form State
  const [site, setSite] = useState("")
  const [host, setHost] = useState("")
  const [action, setAction] = useState<ActionState>("ping")

  
  //API Response State
  const [success, setSuccess] = useState(false)
  const [output, setOutput] = useState("")
  const [hostname, setHostname] = useState("")

  useEffect(() => {
    if(data){
      setSite(Object.keys(data)[0])
    }
  }, [data])


  async function handleForm(){
    setIsWaitingRouterResponse(true)
    setSuccess(false)

    console.log(site)

    fetch(`/api/${action}?` + new URLSearchParams({
        site: site,
        host: host
    }))
      .then(response => response.json())
      .then((json: CommandAPIResponse) => {
        setIsWaitingRouterResponse(false)
        if(json.success == true){
          setOutput(json.output!.rawCommandOutput)
          setSuccess(json.success)
        }else{
          setError(json.error!)
          setSuccess(json.success)
        }
      })
      .catch(error => console.error(error));

  }
 
  if (error) return <div>failed to load</div>
  return (
    <>
      <NavBar/>
      <div className="w-screen flex flex-col items-center" id="Page">
        <div className="w-3/4 h-12" id="Page.App">
          <div className="mr-auto w-3/4" id="Page.App.HeaderContainer">
            <h1 className="text-4xl text-white font-semibold" id="Page.App.HeaderContainer.Title">Looking Glass</h1>
            <p className="text-lg text-white mt-2" id="Page.App.HeaderContaine.Subtitler">Our Looking Glass provides expanded, drill-down information relative to backbone routing and efficiency of the network. Its capabilities include BGP Route Lookup, Ping, and Traceroute.</p>
          </div>

          <div id="Page.App.InputForm" className="mt-12">
            
              <div className="bg-zinc-900 rounded-2xl px-8 py-4"  id="Page.App.InputForm.Grid.Location">
                <div className="my-4">
                  <label htmlFor="locations" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Action</label>
                  <select onChange={event => setAction(event.target.value as ActionState)}id="locations" name="location" className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">

                    <option value={"ping"}>ICMP Ping</option>
                    <option value={"trace"}>Traceroute</option>
                    <option value={"route"}>BGP Route Lookup</option>
                  </select>
                </div>
                <div className="my-4">
                  <label htmlFor="locations" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Source Site</label>
                  <select onChange={event => setSite(event.target.value)} id="locations" name="location" className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                  {data ? (
                    <>
                    {Object.keys(data).map((key: string) => {
                      const site = data[key];
                      return (
                          <option value={key}>{site.name}</option>
                      );
                  })}
                    </>
                  ) : (<></>)}
                  </select>
                </div>
                <div className="my-4">
                    <label htmlFor="hostname" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">IP / Host / Subnet</label>
                    <input onChange={event => setHost(event.target.value)} type="text" id="hostname" name="hostname" className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"/>
                </div>
                <div className="flex flex-row w-full items-center">
                  <button onClick={handleForm} type="submit" className="px-4 py-2 text-base font-bold text-white bg-purple-600 rounded-xl mr-auto">Run Command</button>
                  {isWaitingRouterResponse ? <span className="text-xl ml-auto animate-pulse">Querying router, please wait...</span> : <></>}
                </div>
              </div>
          </div>


          {success ? (
            <div className="mt-12 bg-zinc-900 w-full flex flex-col rounded-2xl py-4 px-8 overflow-scroll">
              <h4 className="text-white font-bold">Router Output</h4>
              <pre className="text-white">
<span className="text-gray-400">rtr1-edge.hopky.nixlabs.dev&gt; traceroute 1.1.1.1</span>
<br/>
{output}
<br/>
<span className="text-green-400">Command Executed Successfully.</span>
              </pre>
            </div>
          ) : (
            <div className="w-full flex flex-row justify-center items-center mt-12">
              <span className="text-red-400 text-2xl">{formError}</span>
            </div>
          )}
        </div>
      </div>
    </>  
  );
}
  