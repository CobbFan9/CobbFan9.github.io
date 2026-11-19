import styled from "styled-components";
import Link from "./link";

export type AppCardModel = {
    Title: string;
    Desc: string;
    Link: string;
}

type AppListProps = {
    cards: AppCardModel[];
};

export default function AppList({ cards }: AppListProps) {
    return (
        <Applist>
            {cards.map((card) => (
                <Appcard key={card.Title}>
                    <Apptitle>{card.Title}</Apptitle>
                    <Appdesc>{card.Desc}</Appdesc>
                    {card.Link.startsWith("http") ? (
                        <ExternalLink href={card.Link} target="_blank" rel="noopener noreferrer">
                            Open
                        </ExternalLink>
                    ) : (
                        <Applink to={card.Link}>
                            Open
                        </Applink>
                    )}
                </Appcard>
            ))}
        </Applist>
    )
}

const Applist = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
`;

const Appcard = styled.div`
    background: var(--card-background-dark);
    border: 2px solid var(--border-dark);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    padding: 30px 24px 24px;
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.2s, border-color 0.2s;

    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
        border-color: var(--border-hover-dark);
    }
`;

const Apptitle = styled.div`
    font-size: 1.3em;
    margin-bottom: 10px;
    color: var(--text-dark);
`;

const Appdesc = styled.div`
    font-size: 1em;
    color: var(--text-secondary-dark);
    margin-bottom: 18px;
`;

const ExternalLink = styled.a`
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
    color: white;
    background-color: var(--button);
    padding: 10px 20px;
    border: 2px solid var(--button-hover);
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: box-shadow 0.3s, background-color 0.3s;

    &:hover {
        box-shadow: 0 0 0 2px black;
        background-color: var(--button-hover);
    }
`;

const Applink = styled(Link)`
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
    color: white;
    background-color: var(--button);
    padding: 10px 20px;
    border: 2px solid var(--button-hover);
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: box-shadow 0.3s, background-color 0.3s;

    &:hover {
        box-shadow: 0 0 0 2px black;
        background-color: var(--button-hover);
    }
`;
