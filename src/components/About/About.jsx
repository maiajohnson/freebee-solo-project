import React from "react";
import './About.css';
import QRCode from 'react-qr-code';

function About() {
    return (
        <div>
        <div>
            <h3 className="about-title">Thank you for watching!</h3>
        </div>
        <div className="container">
            <h3>Technologies Used:</h3>
            
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>Nodemon</li>
                <li>React</li>
                <li>Express</li>
                <li>SweetAlert</li>
                <li>Twilio API</li>
            </ul>

            <table className="about-table">
                <tbody>
                    <tr>
                        <td className="about-td">
                            <QRCode
                                title="GitHub"
                                value="https://github.com/maiajohnson"
                                bgColor="white"
                                fgColor="black"
                                size="100"
                            />
                            <br></br>
                            <label>
                                GitHub
                            </label>
                        </td>
                        <td className="about-td">
                            <QRCode
                                title="LinkedIn"
                                value="https://www.linkedin.com/in/maia-lee-johnson/"
                                bgColor="white"
                                fgColor="black"
                                size="100"
                            />
                            <br></br>
                            <label>
                                LinkedIn
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default About;