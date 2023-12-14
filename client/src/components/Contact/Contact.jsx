import { MdCall } from 'react-icons/md'
import { BsChatLeftDots } from 'react-icons/bs'
import { MdChatBubble } from 'react-icons/md'
import { FaVideo } from 'react-icons/fa'

import './Contact.css'

const Contact = () => {
    return (
        <section id="contact" className="c-wrapper">
            <div className="paddings innerWidth flexCenter c-container">
                {/* left side */}
                <div className="flexColStart c-left">
                    <span className="orangeText">Our Contact Us</span>
                    <span className="primaryText">Easy to contact us</span>
                    <span className="secondaryText">
                        We always ready to help by providijng the best services
                        for you. We beleive a good blace to live can make your
                        life better
                    </span>

                    <div className="flexColStart contactModes">
                        {/* first row */}
                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25} />
                                    </div>

                                    <div className="flexColStart detail">
                                        <span>Call</span>
                                        <span>+261 34 12 234 56</span>
                                    </div>
                                </div>
                                <div className="flexColCenter button">
                                    Call Now
                                </div>
                            </div>

                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsChatLeftDots size={25} />
                                    </div>

                                    <div className="flexColStart detail">
                                        <span>Chat</span>
                                        <span>+261 34 12 234 56</span>
                                    </div>
                                </div>
                                <div className="flexColCenter button">
                                    Chat Now
                                </div>
                            </div>
                        </div>

                        {/* secon row */}
                        <div className="flexStart row">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <FaVideo size={25} />
                                    </div>

                                    <div className="flexColStart detail">
                                        <span>Video Call</span>
                                        <span>+261 34 12 234 56</span>
                                    </div>
                                </div>
                                <div className="flexColCenter button">
                                    Video Call Now
                                </div>
                            </div>

                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdChatBubble size={25} />
                                    </div>

                                    <div className="flexColStart detail">
                                        <span>Message</span>
                                        <span>+261 34 12 234 56</span>
                                    </div>
                                </div>
                                <div className="flexColCenter button">
                                    Message Now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* righ side */}
                <div className="c-right">
                    <div className="image-container">
                        <img src="./Contact.jpg" alt="contact" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
