
import { useState, useId } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

import { Card } from "./page";

interface CollapsibleCardProps {
    title: string;
    children: ReactNode;
    defaultExpanded?: boolean;
}

export function CollapsibleCard({ title, children, defaultExpanded = true }: CollapsibleCardProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const contentId = useId();

    return (
        <Card>
            <CollapsibleCardHeader>
                <CollapseButton
                    $expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-controls={contentId}
                    aria-label={expanded ? "Collapse card" : "Expand card"}
                >
                    {">"}
                </CollapseButton>

                <CollapsibleCardTitle>
                    {title}
                </CollapsibleCardTitle>
            </CollapsibleCardHeader>

            {expanded && (
                <CollapsibleCardContent id={contentId}>
                    {children}
                </CollapsibleCardContent>
            )}
        </Card>
    );
}



export const CollapsibleCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

export const CollapsibleCardTitle = styled.h3`
    color: var(--text-dark);
    font-size: 16px;
    margin: 0;
    line-height: 24px;
`;

export const CollapseButton = styled.button<{ $expanded: boolean }>`
    background: transparent;
    border: none;
    color: var(--text-secondary-dark);
    font-size: 24px;
    cursor: pointer;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    line-height: 1;

    transform: rotate(${({ $expanded }) => $expanded ? "90deg" : "0deg"});
    transition: transform 0.2s ease, color 0.2s;

    &:hover {
        color: var(--text-dark);
    }
`;

export const CollapsibleCardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
`;
