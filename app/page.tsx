import Newurl from "@/new-input";
import createNewPost from "@/lib/insertNewAlias";

export default function Home(){
    return(
        <main>
        <div className="flex flex-col items-center bg-blue-200 p-4">

        </div>
            <Newurl createFunc={createNewPost} />

        </main>

    )
}