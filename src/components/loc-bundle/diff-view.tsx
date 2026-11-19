import styled from "styled-components";
import React, { useEffect, useState, useMemo } from "react";

import Modal from "../modal";

import { Card, CardRow } from "./page"
import type { DiffModalViewProps } from "./diff-modal-view";
import DiffModalView from "./diff-modal-view";

import { useLocBundleContext } from "../../ts/loc-bundle/context";
import type { LocDiff } from "../../ts/loc-bundle/loader";

export default function DiffView() {
    const ctx = useLocBundleContext();

    const [filter, setFilter] = useState<"new" | "changed" | "deleted">("new");
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    useEffect(() => {
        if (selectedItem == null) return;
        setShowModal(true);
    }, [selectedItem]);

    const diff = useDiff(ctx.Diff, ctx.subscribe);

    const modalProps = useMemo((): DiffModalViewProps | null => {
        if (!selectedItem) return null;

        switch (filter) {
            case "new":
                return {
                    type: "new",
                    string1: selectedItem,
                    string2: diff.inFile1Not2[selectedItem],
                };

            case "deleted":
                return {
                    type: "deleted",
                    string1: selectedItem,
                    string2: diff.inFile2Not1[selectedItem],
                };

            case "changed":
                return {
                    type: "changed",
                    string1: selectedItem,
                    string2: diff.inBothButDiff[selectedItem].file1,
                    string3: diff.inBothButDiff[selectedItem].file2,
                };
        }
    }, [selectedItem, filter, diff]);

    return (
        <Card>
            <CardRow>
                <FilterView filter={filter} setFilter={setFilter} />
            </CardRow>
            <FullWidthRow>
                <DiffList filter={filter} onSelect={setSelectedItem} />
            </FullWidthRow>
            {showModal && modalProps && (
                <Modal onClose={() => { setShowModal(false); setSelectedItem(null) }}>
                    <DiffModalView {...modalProps} />
                </Modal>
            )}
        </Card>
    )
}

const useDiff = (ref: React.RefObject<LocDiff>, subscribe: (cb: () => void) => () => void) => {
    return React.useSyncExternalStore(
        subscribe,
        () => ref.current!
    );
};

interface FilterViewProps {
    filter: "new" | "changed" | "deleted";
    setFilter: React.Dispatch<React.SetStateAction<"new" | "changed" | "deleted">>;
};

export function FilterView({ filter, setFilter }: FilterViewProps) {
    const ctx = useLocBundleContext();

    const diff = useDiff(ctx.Diff, ctx.subscribe);

    return (
        <FilterContainer>
            <FilterButton $active={filter === "new"} onClick={() => setFilter("new")}>New ({Object.keys(diff.inFile1Not2).length})</FilterButton>

            <FilterButton $active={filter === "changed"} onClick={() => setFilter("changed")}>Changed ({Object.keys(diff.inBothButDiff).length})</FilterButton>

            <FilterButton $active={filter === "deleted"} onClick={() => setFilter("deleted")}>Deleted ({Object.keys(diff.inFile2Not1).length})</FilterButton>
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
    display: flex;
    gap: 0;
`;

const FilterButton = styled.button<{ $active: boolean }>`
    padding: 10px 20px;
    border: 1px solid var(--border-dark);
    background: ${({ $active }) => $active ? "var(--button-hover)" : "var(--button)"};
    color: white;
    cursor: pointer;

    &:first-child {
        border-radius: 6px 0 0 6px;
    }

    &:last-child {
        border-radius: 0 6px 6px 0;
    }
`;

interface DiffListProps {
    filter: "new" | "changed" | "deleted";
    onSelect: (value: string) => void;
}

export function DiffList({ filter, onSelect }: DiffListProps) {
    const ctx = useLocBundleContext();

    const diff = useDiff(ctx.Diff, ctx.subscribe);

    const [search, setSearch] = useState("");

    const items = useMemo(() => {
        let baseItems: string[];

        switch (filter) {
            case "new":
                baseItems = Object.keys(diff.inFile1Not2);
                break;

            case "changed":
                baseItems = Object.keys(diff.inBothButDiff);
                break;

            case "deleted":
                baseItems = Object.keys(diff.inFile2Not1);
                break;

            default:
                baseItems = [];
        }

        return baseItems.filter(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );
    }, [filter, search, diff]);

    return (
        <ContentArea>
            <SearchInput type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <ListContainer>
                {items.map((item, _) => (
                    <ListRowButton key={item} onClick={() => onSelect(item)}>{item}</ListRowButton>
                ))}
            </ListContainer>
        </ContentArea>
    );
}

const ContentArea = styled.div`
    width: 90%;
    max-width: 90%;
    flex: 0 0 90%;
`;

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ListRowButton = styled.button`
    width: 100%;
    box-sizing: border-box;

    padding: 10px 14px;

    background: var(--card-background-dark);
    border: 1px solid var(--border-dark);
    border-radius: 6px;

    color: var(--text-dark);
    text-align: left;

    cursor: pointer;

    overflow-wrap: anywhere;
    word-break: break-word;

    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
        border-color: var(--border-hover-dark);
        background: var(--button);
    }

    &:active {
        transform: scale(0.99);
    }
`;

const SearchInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 10px 14px;
    margin-bottom: 8px;

    border: 2px solid var(--button-hover);
    border-radius: 6px;

    background: var(--card-background-dark);
    color: var(--text-dark);

    font-size: 16px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--button-hover);
    }
`;

const FullWidthRow = styled(CardRow)`
    width: 100%;
    align-items: stretch;
`;