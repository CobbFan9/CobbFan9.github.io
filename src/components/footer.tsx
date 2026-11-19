import styled from "styled-components";

import Link from "./link"

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterLinks>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/terms">Terms</Link>
                    <a href="https://discord.gg/cmZjsRBwTY" target="_blank" rel="noopener noreferrer">Discord</a>
                    <a href="https://github.com/CobbFan9/CobbFan9.github.io" target="_blank" rel="noopener noreferrer">Source Code</a>
                </FooterLinks>

                <FooterText>
                    © 2026 CobbFan9
                    <br></br>CobbFan9 is not affiliated with EA, CG, Disney, or Lucasfilm LTD.
                </FooterText>
            </FooterContent>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    margin-top: 60px;
    background-color: var(--navbar-background-dark);
    border-top: 1px solid var(--navbar-border-dark);
`;

const FooterContent = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 24px 20px;

    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
`;

const FooterLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    a {
        color: var(--text-secondary-dark);
        text-decoration: none;

        &:hover {
            color: var(--text-dark);
        }
    }
`;

const FooterText = styled.div`
    color: var(--text-secondary-dark);
    font-size: 0.9rem;
`;