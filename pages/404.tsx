import Link from "next/link";
import { Layout } from "../components/Layout";

export const NotFound = () => {
    return (
        <Layout>
            <main className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-5xl font-bold text-white">Not | Found</h1>

                <Link href="/">
                    <button className="my-btn w-full py-3 bg-slate-200 hover:bg-slate-300 text-sky-500 cursor-pointer font-bold text-xl hover:underline">
                        SignIn
                    </button>
                </Link>
            </main>
        </Layout>
    );
};

export default NotFound;
