import React from "react";

import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://play.google.com/store/apps/details?id=com.HyperactiveGames.GoalKeeper&pli=1">
            EtuMates
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://play.google.com/store/apps/details?id=com.HyperactiveGames.GoalKeeper&pli=1">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://play.google.com/store/apps/details?id=com.HyperactiveGames.GoalKeeper&pli=1">
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.HyperactiveGames.GoalKeeper&pli=1"
            target="_blank"
          >
            EtuMates
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
