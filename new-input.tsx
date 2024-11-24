"use client";
import { Button, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";
import styled from 'styled-components';
import createNewPost from "@/lib/insertNewAlias";
import Link from "next/link";
// import {NextResponse} from "next/server";



const StyleForm = styled.form`
   width: 24rem;
   border-radius: 0.75rem;
   padding: 1rem;
   background-color: #7dd3fc;
  
`;

const ResultForm = styled.form`
   width: 100%;
   border-radius: 0.75rem;
   padding: 1rem;
   background-color: #e0f7fa;
   margin-top: 2rem;
   text-align: center;
   border: 1px solid #007bb5;
   color: #007bb5;
   font-weight: bold;
`;

export default function Newurl({
                                    createFunc,
                                }: {
    createFunc: (alias: string, url: string) => Promise<boolean | null>;
}) {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // async function submitNewurl() {
    //      if(await createFunc(alias, url)){
    //             setAlias("");
    //             setUrl("");
    //             setError(null);
    //
    //     }
    //
    //
    // }
    // export async function GET(request: Request): Promise<NextResponse> {
    //     const{searchParams} = new URL(request.url);
    //     const urlParams = searchParams.get("url");
    //
    //     if (!urlParams) {
    //         return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    //     }

    async function isValidUrl(url: string): Promise<boolean> {
        try {
            const response = await fetch(url, { method: "GET" }); // Use HEAD for lightweight validation
            return response.ok;
        } catch {
            return false; // Network or fetch failure
        }
    }

    async function CheckUrlAlias(){
        const check_url = await isValidUrl(url);
        if(!check_url){
            setError("The URL is invalid");
            return;
        }
        const call = await createFunc(alias, url);
        if(call){
            setAlias("");
            setUrl("");
            setError(null);
            setShortenedUrl("")
        }

        const check_alias = await createNewPost(alias, url);
        if(check_alias == null){
            setError("Alias already exist");
            setShortenedUrl("");
            return;
        }

    }


        return (
        <>
        <StyleForm
            className="w-96 rounded-xl p-4 bg-sky-300"
            onSubmit={ (e) => { e.preventDefault(); CheckUrlAlias();}}
            style={{width:"100%"}}
        >


            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%" }}
                label="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />
            <Textarea
                sx={{
                    padding: "0.5rem",
                    height: "100px",
                    width: "100%",
                    borderRadius: 0,
                }}
                variant="soft"
                placeholder="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <div className="w-full flex justify-center">
                <Button
                    variant="contained"
                    type="submit"
                    disabled={alias.length === 0 || url.length === 0}

                    sx={{ width: "100%",
                        color: "black",
                    ".hover": {
                        background: "gray"
                    },
                    }}

                >
                    Submit
                </Button>
            </div>
        </StyleForm>

        <ResultForm>
            {shortenedUrl && <p>Your shortened URL: <Link href={url}>{shortenedUrl}</Link></p>}
        </ResultForm>
    </>
    );
}
