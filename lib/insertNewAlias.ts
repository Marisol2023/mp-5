"use server";
import getCollection, { POSTS_COLLECTION } from "@/db";
import {PostProps} from "@/types";

export default async function createNewPost(
    alias: string,
    url: string,

): Promise<PostProps | null> {
    // const p = {
    //     alias: alias,
    //     url: url,
    //
    // };

    // insert into db (this will be done next week)
    const postCollection = await getCollection(POSTS_COLLECTION);
    const existingAlias = await postCollection.findOne({alias});

    if (!existingAlias) {

    // const shortenedUrl = `localhost:3000/${alias}`;
    const res = await postCollection.insertOne({url, alias});

    if (res.acknowledged) {
        return {
            id: res.insertedId.toString(), // Use MongoDB's ObjectId
            alias,
            url,
            shortenedUrl: "",
        };
    }
    }

    return null;

}

