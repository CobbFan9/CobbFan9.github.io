import styled from "styled-components";

import Discord from "../components/discord"

export default function SWGoHUpdates() {
    return (
        <UpdatesCard>
            <h2>SWGoH Updates</h2>
            <p>SWGoH Updates provides near real time datamines of the game in Discord channels for all to see. Currently it has:</p>
            <ul>
                <li>Update notifications (with ping!)</li>
                <li>Automated asset extraction (including sprites!)</li>
                <li>Automated mine of new localization strings!</li>
            </ul>
            <p>With more on the way!</p>

            <p>We would be very glad to have you join the Discord server and see this tool in action.</p>
            <Discord />
        </UpdatesCard>
    );
}

const UpdatesCard = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 32px;

    background-color: var(--card-background-dark);
    border: 1px solid var(--border-card-dark);
    border-radius: 12px;

    text-align: left;
    color: var(--text-dark);
    line-height: 1.7;

    p {
        margin: 0 0 20px;
    }

    ul {
        margin: 24px 0;
        padding-left: 24px;
    }

    li {
        margin-bottom: 16px;
        color: var(--text-secondary-dark);
    }

    a {
        color: var(--text-dark);
        font-weight: bold;
        text-decoration: none;
        margin-right: 8px;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (max-width: 768px) {
        margin: 20px;
        padding: 24px;
    }
    
    h2 {
        margin-top: 0px;
        text-align: center;
    }
`