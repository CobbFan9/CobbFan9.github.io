
import styled from "styled-components";

import type { AppCardModel } from "../components/applist";
import AppList from "../components/applist";
import Discord from "../components/discord";

type FeatureModel = {
    Title: string;
    Desc: string;
};

const features: FeatureModel[] = [
    {
        Title: "Update Notifications",
        Desc: "Get notified when new game updates are detected, with optional notifications and pings.",
    },
    {
        Title: "Automated Asset Extraction",
        Desc: "Automatically extract newly discovered game assets, including sprites.",
    },
    {
        Title: "Localization Mining",
        Desc: "Automatically discover and collect new localization strings.",
    },
];

const cards: AppCardModel[] = [
    {
        Title: "SWGoH Asset Extractor Web",
        Desc: "Extract SWGoH game assets directly in your browser.",
        Link: "/asset-extractor-web",
    },
    {
        Title: "SWGoH Localization String Parser",
        Desc: "Understand and parse raw localization strings.",
        Link: "/loc-bundle-format",
    },
    {
        Title: "SWGoH Update Frequency",
        Desc: "Explore how frequently SWGoH receives updates.",
        Link: "/update-frequency",
    },
];

export default function SWGoHUpdates() {
    return (
        <UpdatesPage>
            <UpdatesCard>
                <CardHeader>
                    <h2>SWGoH Updates</h2>
                    <Intro>
                        SWGoH Updates provides near real-time datamines of
                        Star Wars: Galaxy of Heroes, delivering game updates
                        and discoveries directly to Discord channels.
                    </Intro>
                </CardHeader>
            </UpdatesCard>

            <UpdatesCard>
                <CardHeader>
                    <h3>What does it do?</h3>
                </CardHeader>

                <FeatureList>
                    {features.map((feature) => (
                        <li key={feature.Title}>
                            <strong>{feature.Title}</strong>
                            {" - "}
                            {feature.Desc}
                        </li>
                    ))}
                </FeatureList>

                <p>And there's more on the way!</p>
            </UpdatesCard>

            <UpdatesCard>
                <CardHeader>
                    <h3>Join the Community</h3>
                    <p>
                        Want to see these tools in action? We'd be
                        very glad to have you join our Discord server!
                    </p>
                    <Discord />
                </CardHeader>
            </UpdatesCard>

            <UpdatesCard>
                <CardHeader>
                    <h3>Available Tools</h3>
                    <p>
                        We also provide several useful SWGoH-related
                        tools directly on this site.
                    </p>
                </CardHeader>

                <AppList cards={cards} />
            </UpdatesCard>
        </UpdatesPage>
    );
}

const UpdatesPage = styled.div`
    padding-top: 7px;
    min-height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
`;

const UpdatesCard = styled.div`
    background: var(--card-background-dark);
    border: 2px solid var(--border-dark);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);

    padding: 30px 24px 24px;
    width: 80%;
    max-width: 800px;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;

    color: var(--text-dark);
    line-height: 1.7;

    transition: box-shadow 0.2s, border-color 0.2s;

    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
        border-color: var(--border-hover-dark);
    }

    h2, h3 {
        margin: 0;
        color: var(--text-dark);
    }

    p {
        margin: 0;
        color: var(--text-dark);
    }

    @media (max-width: 768px) {
        width: auto;
        margin: 0 20px;
        padding: 24px;
    }
`;

const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    text-align: center;
`;

const Intro = styled.p`
    max-width: 650px;
    text-align: center;
`;

const FeatureList = styled.ul`
    width: fit-content;
    max-width: 100%;
    align-self: center;

    margin: 0;
    padding-left: 22px;

    list-style-position: inside;

    li {
        padding-left: 2px;
        margin-bottom: 12px;
        color: var(--text-secondary-dark);
    }

    li:last-child {
        margin-bottom: 0;
    }

    strong {
        color: var(--text-dark);
    }
`;