import React from "react";
import PropTypes from "prop-types";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
    username: string;
}

const Profile: NextPage<Props> = () => {
    const r = useRouter();
    const { username } = r.query;
    return <div>Hello! {username}</div>;
};

export default Profile;
