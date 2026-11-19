import styled from "styled-components";

export default function Discord() {
    return (
        <>
            <DiscordContainer href="https://discord.gg/cmZjsRBwTY" target="_blank">
                <DiscordImg src="/discord.svg" alt="Discord" />
                <DiscordText>Join our Discord</DiscordText>
            </DiscordContainer>
        </>
    );
}

const DiscordContainer = styled.a`
    background-color: #5865F2;
    align-items: center; 
    gap: 9px;
    display: inline-flex;
    cursor: pointer;
    color: white;
    padding: 10px 20px;
    border: 3px solid black;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: box-shadow 0.3s, background-color 0.3s;
`

const DiscordImg = styled.img`
    width: 20px; 
    height: 20px;
`

const DiscordText = styled.p`
    margin-bottom: 0px !important;
`