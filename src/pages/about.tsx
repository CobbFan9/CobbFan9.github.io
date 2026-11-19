import styled from "styled-components";

import Link from "../components/link";

export default function About() {
    return (
        <AboutPage>
            <p>Hi! I'm CobbFan9, I made this site originally for portrait maker, however I have since added numerous tools. Here
                are some of the ones I find most worth sharing</p>
            <ul>
                <li><Link to="/swgoh-updates">Update Notifier</Link> A discord based automatic datamining tool for SWGoH</li>
                <li><Link to="/swgoh-portrait-maker">SWGoH Portrait Maker</Link> A tool that overlays custom SWGoH style borders
                    over your images</li>
                <li><a href="https://github.com/CobbFan9/swgoh-assetapi">SWGoH AssetAPI</a> An asset datamining tool for SWGoH
                </li>
                <li><Link to="/loc-bundle-format">SWGoH Localization Bundle Parser</Link> A tool to explore SWGoH Localization Bundles</li>
                <li><Link to="/asset-extractor-web">Asset Extractor Web</Link> A showcase of another project, <a href="https://www.npmjs.com/package/@lego-fan9/asset-studio-web">asset-studio-web</a></li>
                <li><Link to="/update-freq">SWGoH Update Frequency</Link> Shows the frequency of updates in SWGoH</li>
            </ul>
            <p>There are more plans for the future, but for now I think thats all. MTFBWY</p>
        </AboutPage>
    )
}

const AboutPage = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 32px;

    background-color: var(--card-background-dark);
    border: 1px solid var(--border-card-dark);
    border-radius: 12px;

    color: var(--text-dark);
    text-align: left;
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
`;