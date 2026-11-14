import { useState, useEffect } from "react";
import styled from "styled-components";

import Modal from "../components/modal";

export default function AuthLogin() {
    const [pass, setPass] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (import.meta.env.AUTH_SERVER === undefined) {
            return;
        }

        async function login(password: string) {
            const response = await fetch(import.meta.env.AUTH_SERVER, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `${password}`,
                },
            });

            if (!response.ok) {
                return;
            }

            setLoggedIn(true);
        }

        login(pass);
        setShowModal(true);
    }, []);

    return (
        <Page>
            <Card>
                <CardRow>
                    <p>This page serves as a protection against GoogleBot. For now passwords aren't super secret, Don't intentionally share them, but they are more or less fine.</p>
                    <p>Whenever you visit the site on a new computer you must authenticate here (/auth/login) before visiting other pages.</p>
                    <p>If you don't have a password, that means you aren't a beta user. Either contact CobbFan9 or see https://CobbFan9.github.io</p>
                    <p>Oh also, if CobbFan9 asked you to roast the site you don't need to roast this page, it's fine to be dumb :)</p>
                </CardRow>
            </Card>
            <Card>
                <CardRow>
                    <p>Input Password to get Beta access:</p>
                    <input type="text" onChange={(e) => setPass(e.target.value)} className="common-button" />
                </CardRow>
            </Card>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Card>
                        <CardRow>
                            <p>Login {loggedIn ? "succeeded" : "failed"}.</p>
                        </CardRow>
                    </Card>
                </Modal>
            )}
        </Page>
    )
}


export const Page = styled.div`
    padding-top: 7px;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
`;

export const Card = styled.div`
    background: var(--card-background-dark);
    border: 2px solid var(--border-dark);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    padding: 30px 24px 24px;
    width: 80%;
    height: fit-content;

    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    transition: box-shadow 0.2s, border-color 0.2s;

    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
        border-color: var(--border-hover-dark);
    }
`;

export const CardRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    ul {
        margin: 0;
        padding-left: 20px;
        max-width: 60%;
    }
`;