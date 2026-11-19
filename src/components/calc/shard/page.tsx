
import styled from "styled-components";

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