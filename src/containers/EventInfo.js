import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import basketball from "../assets/SportIcons/basketball.png"
import soccer from "../assets/SportIcons/soccer.png"
import football from "../assets/SportIcons/football.png"
import hockey from "../assets/SportIcons/hockey.png"
import volleyball from "../assets/SportIcons/volleyball.png"
import returnIcon from "../assets/return.png";
import infoIcon from "../assets/info.png";
import clockIcon from "../assets/clock.png";
import pinIcon from "../assets/pin.png";
import membersIcon from "../assets/members.png";

import {
  Typography,
  Row,
  Col
} from "antd";

const { Title } = Typography;

export default class EventInfo extends Component {
    getImage = (sport) => {
        switch(sport) {
            case "basketball":
                return basketball
            case "soccer":
                return soccer
            case "football":
                return football
            case "hockey":
                return hockey
            case "volleyball":
                return volleyball
            default:
                return 
        }
    }
  render() {
    return (
      <div>
        <Row style={{ marginTop: 70, width: "100%" }}>
          <Col flex="30px" />
          <Col flex="auto">
            <Title level={2} style={styles.title}>
                <NavLink to='/myevents' exact>
                    <img style={{marginRight: "10px"}} src={returnIcon} alt="return"/>
                </NavLink>
                {this.props.location.aboutProps.title}
            </Title>

            <div style={styles.rectange}>
                <div style={styles.sportIcon}>
                    <img style={{ width: "70px", height: "70px"}} src={this.getImage(this.props.location.aboutProps.ball)} alt="sportIcon"/>
                </div>
                <Row>
                    <Col style={{width:"20%"}}>
                        <img style={{ width: "30px", height: "30px", marginLeft: "20px", marginTop: "10px" }} src={infoIcon} alt="info"/>
                    </Col>
                    <Col style={{width: "80%"}}>
                    <h4 style={{marginLeft: "10px"}}>Description</h4>
                    <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

                    </Col>
                </Row>

                <Row>
                    <Col style={{width:"20%"}}>
                        <img style={{ width: "30px", height: "30px", marginLeft: "20px", marginTop: "5px" }} src={clockIcon} alt="clock"/>
                    </Col>
                    <Col style={{width: "80%"}}>
                        <h4 style={{marginLeft: "10px"}}>Saturday at 9:41 AM</h4>
                        <p style={{marginLeft: "10px", marginTop: "-10px"}}>Jan 27th, 2021</p>
                    </Col>
                </Row>

                <Row>
                    <Col style={{width:"20%"}}>
                        <img style={{ width: "25px", height: "33.33px", marginLeft: "20px", marginTop: "10px" , marginTop: "10px"}} src={pinIcon} alt="pin"/>
                    </Col>
                    <Col style={{width: "80%"}}>
                        <h4 style={{marginLeft: "10px"}}>1280 Main St W</h4>
                        <p style={{marginLeft: "10px", marginTop: "-10px"}}>Jan 27th, 2021</p>
                        <p style={{marginLeft: "10px", marginTop: "-20px", fontStyle: "italic"}}>10 km away</p>
                    </Col>
                </Row>

                <Row>
                    <Col style={{width:"20%"}}>
                        <img style={{ width: "35.71px", height: "25px", marginLeft: "20px", marginTop: "10px" }} src={membersIcon} alt="members"/>
                    </Col>
                    <Col style={{width: "80%"}}>
                        <h4 style={{marginLeft: "10px", fontWeight: "bold"}}>Member List</h4>
                        <ul style={styles.ul}>
                            <li style={styles.li}>Clinton P.Thomas</li>
                            <li style={styles.li}>Thomas M. Parks</li>
                            <li style={styles.li}>James F. Castillo</li>
                        </ul>
                    </Col>
                </Row>
            </div>
          </Col>
          <Col flex="30px" />
        </Row>
      </div>
    );
  }
}

const styles = {
    rectange: {
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        border : "1px solid #C4C4C4",
        boxSizing: "border-box",
        borderRadius: "15px",
        marginTop: 10
    },
    title: {
        display: "flex",
        alignItems: "center", /* align vertical */
    },
    sportIcon: {
        display: "flex",
        justifyContent: "center", /* align horizontal */
        alignItems: "center", /* align vertical */
        margin: "50px"
    },
    ul: {
        listStyleType: "none", /* Remove bullets */
        padding: 0, /* Remove padding */
        margin: 0 /* Remove margins */,
        marginLeft: "10px",
        marginTop: "-10px"
    },
    li: {
        marginTop: "-5px"
    },
    text: {
        width : "200px",
        wordWrap: "break-word",
        marginLeft: "10px",
        marginTop: "-10px"
    }
};