import { useState } from "react";
import styled from "styled-components";
import Link from "./link";

const links = [
    { href: "#", text: "Back", isBack: true },
    { href: "/", text: "Home" },
    { href: "/swgoh-portrait-maker", text: "SWGoH Portrait Maker" },
    { href: "/swgoh-updates", text: "SWGoH Updates" },
    { href: "/about", text: "About" },
];

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        closeMenu();
        window.history.back();
    };

    return (
        <Nav>
            <NavContainer>
                <Logo>SWGoH Updates</Logo>

                <MenuToggle aria-label="Toggle menu" onClick={() => setMenuOpen((prev) => !prev)}>
                    {menuOpen ? "✕" : "☰"}
                </MenuToggle>

                <NavLinks $open={menuOpen}>
                    {links.map((link) => (
                        <li key={link.text}>
                            {link.isBack ? (
                                <Link to="#" onClick={handleBack}>
                                    {link.text}
                                </Link>
                            ) : (
                                <Link to={link.href} onClick={closeMenu}>{link.text}</Link>
                            )}
                        </li>
                    ))}
                </NavLinks>
            </NavContainer>
        </Nav>
    );
}

const Nav = styled.nav`
    background-color: var(--navbar-background-dark);
    border-bottom: 1px solid var(--navbar-border-dark);
    width: 100%;
`;

const NavContainer = styled.div`
    font-family: Arial, sans-serif;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    max-width: 1000px;
    margin: 0 auto;
`;

const Logo = styled.div`
    font-weight: bold;
    color: var(--text-dark);
    font-size: 1.2em;
`;

const MenuToggle = styled.button`
    background: none;
    border: none;
    font-size: 1.5em;
    color: var(--text-dark);
    cursor: pointer;
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;

const NavLinks = styled.ul<{ $open: boolean }>`
    list-style: none;
    display: flex;
    gap: 25px;
    margin: 0;
    padding: 0;

    li {
        border: none !important;
    }

    a {
        color: var(--text-dark);
        text-decoration: none !important;
        font-weight: bold;
        transition: color 0.2s;

        &:hover {
            color: var(--link-hover-dark);
        }
    }

    @media (max-width: 768px) {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--navbar-background-dark);
        flex-direction: column;
        margin: 0;
        z-index: 1001;
        gap: 0;
        border-bottom: 1px solid var(--navbar-border-dark);

        display: ${({ $open }) => ($open ? "flex" : "none")};

        li {
            padding: 10px 0;
            border-top: 1px solid var(--navbar-border-dark);
        }

        a {
            display: block;
            width: 100%;
            padding: 10px 0;
            text-align: center;
        }
    }
`;