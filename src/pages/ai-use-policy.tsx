
import styled from "styled-components";

export default function AiUsePolicy() {
    return (
        <Page>
            <Card>
                <CardHeader>
                    <h1>
                        CobbFan9's AI use policy
                    </h1>
                </CardHeader>
                <CardRow>
                    <p>
                        Not a guideline for you, but what CobbFan9 does with AI
                    </p>
                </CardRow>
            </Card>
            <Card>
                <CardHeader>
                    <h2>
                        AI for life
                    </h2>
                </CardHeader>
                <CardRow>
                    <p>
                        AI is useful in your day to day life, I do use ChatGPT and the Google Search result AI frequently. The thing I always consider, is when is it proper to ask AI.
                        <br />
                        My main consideration for when to use AI is:
                    </p>
                    <List>
                        <li>Can AI reliably answer?</li>
                        <li>Will AI be fastest?</li>
                        <li>Will going to something other than AI cause good conversation?</li>
                    </List>
                    <p>
                        If my AI use cannot be 1, it will of course be out of consideration. If I can get it faster with reddit, I'll use reddit. If it's a cookie recipe in my family, of course I will ask someone in my family.
                        <br />
                        The point I make here is, AI should not be constantly your focus. You should consider it a tool. Can you eat something with a hammer instead of a spoon? Yea, but not easily.
                    </p>
                </CardRow>
            </Card>
            <Card>
                <CardHeader>
                    <h2>
                        AI for code
                    </h2>
                </CardHeader>
                <CardRow>
                    <p>
                        AI for code... what a complex subject.<br />
                        I do use AI for code. But sparingly. I will often have a chatgpt tab open, and I treat it like a rubber duck, "Why doesnt this work?!?!?!?"
                        The key thing is, I don't accept a bad answer. Very rarely does AI make code I accept without modification. Most of my code is written by me.
                        <br />
                        <br />
                        Now a hot take, if you don't know how to code, you shouldn't vibe code. I'm positive it could be argued, but it is what I firmly belive.
                        The reason I think this, is because of how often it is sooo close to right but not. When it gets to application security? Yea no thanks get someone who knows what they can do.
                        Another issue with vibe coding is that there is a community for what you are tring to do. Let them do what they want to do, which is make tools for you.
                        I see people make games and libraries and such with AI based on another, but the original app devs had the idea and want to provide it, let them do what they love!
                    </p>
                </CardRow>
            </Card>
        </Page>
    )
}

const List = styled.ol`
    width: fit-content;
    max-width: 100%;

    margin: 0 auto;
    padding-left: 28px;

    list-style-position: outside;
    text-align: left;

    li {
        padding-left: 0;
        margin-bottom: 12px;
        color: var(--text-dark);
    }

    li:last-child {
        margin-bottom: 0;
    }

    li::marker {
        color: var(--accent-dark);
        font-weight: bold;
    }
`;

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
    align-items: stretch;
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
`;

export const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;

export const CardDescription = styled.p`
    max-width: 650px;
    text-align: center;
`;