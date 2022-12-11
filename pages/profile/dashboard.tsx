import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { FaPlus } from "react-icons/fa";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { authOptions } from "../api/auth/[...nextauth]";

interface DashboardProps {
    secure: boolean;
}

const Dashboard: NextPage = () => {
    return (
        <>
            <Header />

            <Layout className="items-start">
                <main className="w-[80%] flex flex-row pt-[80px]">
                    <section className="flex justify-between items-center bg-slate-200 w-full h-20 px-5 rounded-md shadow-lg mb-12n">
                        <h1 className="font-bold text-black text-2xl">
                            DashBoard
                        </h1>
                        <button className="my-btn w-auto bg-sky-400 text-white hover:bg-sky-500 hover:shadow-lg">
                            Criar Link
                            <FaPlus />
                        </button>
                    </section>
                </main>
            </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return {
            props: {},
            redirect: {
                destination: "/",
            },
        };
    }
    return {
        props: {
            secure: !!session,
        },
    };
};

export default Dashboard;
