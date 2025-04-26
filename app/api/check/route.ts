import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const body = await req.json();
    const URL = body.url;
    const response = await fetch(URL, { method: 'GET' });
    const status = (response.status);
    const statusText =(response.statusText);

    
    return NextResponse.json({
        status,
        statusText
    })
}