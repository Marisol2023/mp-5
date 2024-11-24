"use client";
import { PostProps } from "@/types";
import { useState } from "react";
import createNewPost from "@/lib/insertNewAlias";
import Newurl from "@/new-input";

export default function DisplayAllPosts({
                                            inputPosts,
                                        }: {
    inputPosts: PostProps[];
}) {
    const [posts, setPosts] = useState(inputPosts);


    async function addNewPost(alias: string, url: string) {
        const p = await createNewPost(alias, url);
        if (p === null) {
            return false;
        }

        setPosts([p, ...posts]);
        return true;
    }

    return (
        <div className="flex flex-col items-center">
            <Newurl createFunc={addNewPost} />

        </div>
    );
}
