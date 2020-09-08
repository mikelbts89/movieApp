import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Routes } from "../../data/index";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { IRoute } from "../../interface/IRoute";
import { IRouteList } from "../../interface/IRoutList";
import axios from "axios";
import { render } from "@testing-library/react";

interface IProps {}

interface IUserState {
  userImageUrl: string;
  firstName: string;
  lastName: string;
}

class NavigationApp extends React.Component<IProps, IUserState> {
  constructor(props: IProps) {
    super(props);
    this.state = { userImageUrl: "", firstName: "", lastName: "" };
  }

  async getUserImg() {
    const userData = await axios.get("https://randomuser.me/api/");
    const { data } = userData;
    const { results } = data;
    const [user] = results;
    this.setState({
      userImageUrl: user.picture.medium,
      firstName: user.name.first,
      lastName: user.name.last,
    });
  }

  componentDidMount() {
    this.getUserImg();
  }

  render() {
    return (
      <Navbar style={{ backgroundColor: "#3D93A5" }}>
        <div
          style={{ backgroundColor: "#3D93A5", display: "flex" }}
          className="col-lg-12 "
        >
          <Navbar.Brand href="#home" style={{ color: "white" }} className="m-2">
            Navbar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinksList routeList={Routes} />
              <NavDropdown
                title="More Info"
                id="basic-nav-dropdown"
                className="m-2"
              >
                <NavDropdown.Item>About us</NavDropdown.Item>
                <NavDropdown.Item>Contacts</NavDropdown.Item>
                <NavDropdown.Item>Vision</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Team</NavDropdown.Item>
              </NavDropdown>
              <img
                src={this.state.userImageUrl}
                style={{
                  borderRadius: "50%",
                  border: "1px solid #3D93A5",
                  height: "60px",
                  width: "60px",
                }}
                className="offset-lg-11"
              ></img>
              <p>
                {this.state.firstName} {this.state.lastName}
              </p>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

function LinksList(props: IRouteList): JSX.Element {
  return (
    <>
      {props.routeList.map((element: IRoute, index: number) => {
        const { path, name } = element;
        return (
          <Link
            to={path}
            style={{ color: "white" }}
            key={`link ${index}`}
            className="m-3"
          >
            {name}
          </Link>
        );
      })}
    </>
  );
}

export default NavigationApp;
