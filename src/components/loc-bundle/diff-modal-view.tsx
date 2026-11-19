import styled from "styled-components";
import { useState } from "react";

import { diffChars } from "diff";

import { Page, Card, CardRow } from "./page"

import { Copy, formatString, DiscordFormat } from "../../ts/loc-bundle/format";

export type DiffModalViewProps =
    | {
        type: "new";
        string1: string;
        string2: string;
    }
    | {
        type: "deleted";
        string1: string;
        string2: string;
    }
    | {
        type: "changed";
        string1: string;
        string2: string;
        string3: string;
    };

export default function DiffModalView(props: DiffModalViewProps) {
    const [copiedF, setCopiedF] = useState(false);
    const [copiedR, setCopiedR] = useState(false);
    const [copiedD, setCopiedD] = useState(false);

    const handleCopy = async (setCopied: React.Dispatch<React.SetStateAction<boolean>>, text: string) => {
        await Copy(text);

        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    }

    return (
        <Page>
            <Card>
                <CardRow>
                    <Title>
                        <b>{getTitle(props.type)}</b>
                    </Title>
                    <Paragraph>
                        {props.string1}
                    </Paragraph>
                </CardRow>
            </Card>
            {props.type !== "changed" ? (
                <>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Formatted String</b>
                                </Title>
                                <CopyButton $copied={copiedF} onClick={() => handleCopy(setCopiedF, formatString(props.string2))}>
                                    {copiedF ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>
                            <Paragraph style={{ margin: "6px", whiteSpace: "pre-wrap" }}>{formatString(props.string2)}</Paragraph>
                        </CardRow>
                    </Card>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Raw String</b>
                                </Title>
                                <CopyButton $copied={copiedR} onClick={() => handleCopy(setCopiedR, props.string2)}>
                                    {copiedR ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>
                            <Paragraph style={{ margin: "6px" }}>{props.string2}</Paragraph>
                        </CardRow>
                    </Card>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Discord Sharing</b>
                                </Title>
                                <CopyButton $copied={copiedD} onClick={() => handleCopy(setCopiedD, DiscordFormat(props.string1, props.string2))}>
                                    {copiedD ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>

                            <Paragraph style={{ margin: "6px"}}>Copy with extra formatting for Discord</Paragraph>
                        </CardRow>
                    </Card>
                </>
            ) : (
                <>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Formatted Diff</b>
                                </Title>
                                <CopyButton $copied={copiedF} onClick={() => handleCopy(setCopiedF, formatString(props.string2))}>
                                    {copiedR ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>

                            <DiffText>
                                {renderDiff(formatString(props.string2), formatString(props.string3))}
                            </DiffText>
                        </CardRow>
                    </Card>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Unformatted Diff</b>
                                </Title>
                                <CopyButton $copied={copiedR} onClick={() => handleCopy(setCopiedR, props.string2)}>
                                    {copiedR ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>

                            <DiffText>
                                {renderDiff(props.string2, props.string3)}
                            </DiffText>
                        </CardRow>
                    </Card>
                    <Card>
                        <CardRow>
                            <CardHeader>
                                <div />
                                <Title>
                                    <b>Discord Sharing</b>
                                </Title>
                                <CopyButton $copied={copiedD} onClick={() => handleCopy(setCopiedD, DiscordFormat(props.string1, props.string2))}>
                                    {copiedD ? "Copied!" : "Copy"}
                                </CopyButton>
                            </CardHeader>

                            <Paragraph style={{ margin: "6px"}}>Copy with extra formatting for Discord</Paragraph>
                        </CardRow>
                    </Card>
                </>
            )}
        </Page>
    );
}

const Paragraph = styled.p`
    margin: 0;

    width: 100%;
    max-width: 100%;

    color: var(--text-dark);

    overflow-wrap: anywhere;
    word-break: break-word;

    line-height: 1.8;
`;

const Title = styled.p`
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: var(--text-dark);
    line-height: 1.8;
`;

function getTitle(type: DiffModalViewProps["type"]) {
    switch (type) {
        case "new":
            return "New String";
        case "deleted":
            return "Deleted String";
        case "changed":
            return "Changed String";
    }
}

const CardHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;

    width: 100%;
    padding: 6px 10px;
`;

const CopyButton = styled.button<{ $copied?: boolean }>`
    padding: 6px 10px;
    justify-self: end;
    width: fit-content;

    background: ${({ $copied }) =>
        $copied ? "#2e7d32" : "var(--button)"};

    color: var(--text-dark);

    border: 1px solid var(--border-dark);
    border-radius: 6px;

    cursor: pointer;

    transition: background-color 0.2s ease;

    &:hover {
        background: ${({ $copied }) =>
        $copied ? "#2e7d32" : "var(--button-hover)"};
    }
`;

function renderDiff(oldStr: string, newStr: string) {
    const parts = diffChars(oldStr, newStr);

    return parts.map((part, i) => {
        if (part.added) {
            return (
                <span key={i} style={{ background: "rgba(80,255,120,0.50)" }}>
                    {part.value}
                </span>
            );
        }

        if (part.removed) {
            return (
                <span key={i} style={{ background: "rgba(255,80,80,0.50)" }}>
                    {part.value}
                </span>
            );
        }

        return <span key={i}>{part.value}</span>;
    });
}

const DiffText = styled.div`
    width: 100%;
    padding: 10px 14px;

    text-align: left;
    white-space: pre-wrap;
    word-break: break-word;

    color: var(--text-dark);
    line-height: 1.5;
`;
