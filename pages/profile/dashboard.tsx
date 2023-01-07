import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useClipBoard } from "../../hooks/useClipBoard";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { IoArrowRedo } from "react-icons/io5";
import { Text, Collapse, Tooltip, Button } from "@nextui-org/react";
import { FaPlus, FaCopy } from "react-icons/fa";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { authOptions } from "../api/auth/[...nextauth]";
import { useGetShortsFromUser } from "../../hooks/api/useGetShortsFromUser";
import { ThreeDots } from "react-loader-spinner";
import style from "../../styles/animations.module.css";
import toast from "react-hot-toast";
import { createApiUrl } from "../../utils/url";
import { FabGroup } from "../../components/FabGroup";

interface DashboardProps {
    secure: boolean;
}

const Dashboard: NextPage<DashboardProps> = ({ secure }) => {
    const router = useRouter();
    const { copyToClipboard } = useClipBoard();
    const { shortsData, isLoading, fetchShort } = useGetShortsFromUser();
    const [page, setPage] = useState(1);

    const morePages = async (page: number) => {
        setPage(page);
        await fetchShort(page);
    };
    // const [copiedIdx, setCopiedIdx] = useState(null);

    const copy = (event: any, link: string) => {
        event.stopPropagation();

        copyToClipboard(createApiUrl(link));
        toast.success("Link Copiado!");
    };

    useEffect(() => {
        if (!secure) {
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secure]);

    const randomColor = () => {
        const colors = ["35deg, $blue600 -20%, $pink600 50%"];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    const Title = ({ name, link }: any) => {
        return (
            <Text
                weight="bold"
                size={"$xl"}
                css={{
                    textGradient: randomColor(),
                }}
                className="relative w-full flex items-center"
            >
                {name}
                <FabGroup>
                    <Tooltip content="redirecionar">
                        <span
                            onClick={(_) =>
                                window
                                    .open(createApiUrl(link), "_blank")
                                    ?.focus()
                            }
                            className=" p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
                        >
                            <IoArrowRedo color="white" />
                        </span>
                    </Tooltip>
                    <Tooltip content="copiar">
                        <span
                            onClick={(event) => copy(event, link)}
                            className=" p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
                        >
                            <FaCopy color="white" />
                        </span>
                    </Tooltip>
                </FabGroup>
            </Text>
        );
    };
    return (
        <>
            <Header />
            <Layout className="items-start">
                <main className="w-[90%] flex flex-col pt-[80px] md:w-[768px]">
                    <section className="flex justify-between items-center bg-slate-50 w-full h-20 px-5 rounded-md shadow-lg mb-12n mb-10">
                        <h1 className="font-bold text-black text-2xl">
                            DashBoard
                        </h1>
                        <button
                            onClick={() => router.push("/home")}
                            className="my-btn w-auto bg-sky-400 text-white hover:bg-sky-500 hover:shadow-lg"
                        >
                            Criar Link
                            <FaPlus />
                        </button>
                    </section>

                    <div className="flex flex-col gap-2">
                        {isLoading && !shortsData ? (
                            <ThreeDots
                                wrapperClass="mx-auto"
                                height="80"
                                width="80"
                                radius="9"
                                color="#ffffff"
                            />
                        ) : (
                            <>
                                <Collapse.Group
                                    className={style.popup}
                                    splitted
                                >
                                    {shortsData.map((item: any) => {
                                        return (
                                            <Collapse
                                                key={item.title}
                                                title={
                                                    <Title
                                                        name={item.title}
                                                        link={item.link.short}
                                                    />
                                                }
                                                shadow
                                                className="bg-slate-200"
                                                css={{ background: "$gray100" }}
                                            >
                                                <main className="w-full min-h-32 flex flex-col px-5">
                                                    <Text className="relative">
                                                        Short Link:
                                                    </Text>
                                                    <p className="w-full p-4 bg-slate-100 rounded-md mb-3 relative flex items-center text-clip text-ellipsi">
                                                        {item.link.link}
                                                        <span
                                                            onClick={(event) =>
                                                                copy(
                                                                    event,
                                                                    item.link
                                                                        .link
                                                                )
                                                            }
                                                            className="absolute right-2 p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
                                                        >
                                                            <FaCopy color="white" />
                                                        </span>
                                                    </p>
                                                    <Text>Long Link:</Text>
                                                    <p className="w-full p-4 bg-slate-100 rounded-md relative flex items-center text-clip text-ellipsi">
                                                        {createApiUrl(
                                                            item.link.short
                                                        )}
                                                        <span
                                                            onClick={(event) =>
                                                                copy(
                                                                    event,
                                                                    item.link
                                                                        .link
                                                                )
                                                            }
                                                            className="absolute right-2 p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-green-400"
                                                        >
                                                            <FaCopy color="white" />
                                                        </span>
                                                    </p>
                                                </main>
                                            </Collapse>
                                        );
                                    })}
                                </Collapse.Group>
                                <button
                                    className="my-btn w-[100px] mx-auto"
                                    disabled={isLoading}
                                    onClick={() => morePages(page + 1)}
                                >
                                    {isLoading ? (
                                        <ThreeDots
                                            wrapperClass="mx-auto"
                                            height="50"
                                            width="50"
                                            radius="9"
                                            color="black"
                                        />
                                    ) : (
                                        <>
                                            <span> More </span> <FaPlus />{" "}
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
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
