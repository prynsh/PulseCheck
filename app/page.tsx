'use client'
import axios from "axios";
import { useState } from "react";
import SignIn from "./component/SignIn";


async function getStatus(url:string){
      const response = await axios.post("/api/check",{url});
      console.log(response);
}


export default function Home() {
  const [url,setUrl]= useState("")
  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen   ">
      <SignIn/>
      {/* <input className="w-fit p-2 m-2 border" placeholder="URL..." value={url} onChange={(e)=>{
        setUrl(e.target.value)
      }} ></input>
      <button className="p-2 border w-fit" onClick={()=>{
        getStatus(url)}}>Search</button> */}
    </div>
  );
}
