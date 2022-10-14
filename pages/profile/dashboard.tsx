import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

interface DashboardProps {
    secure: boolean;
}

const Dashboard: NextPage = () => {
    return <div>Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    return {
        props: {
            secure: !!session,
        },
        redirect: "/",
    };
};

export default Dashboard;
