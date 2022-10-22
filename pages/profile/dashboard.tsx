import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
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

            <Layout>
                <main className="w-[400px] flex flex-row">
                    <header className="w-[400px] flex flex-row">
                        <h1>DashBoard</h1>
                        <button className="my-btn">Criar Link</button>
                    </header>
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
