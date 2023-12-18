import './Hero.css'

import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="hero-wrapper">
            <div className="paddings innerWidth  flexCenter hero-container">
                {/* left side */}
                <div className="flexColStart hero-left">
                    <div className=" hero-title">
                        <div className="orange-circle" />
                        <motion.h1
                            initial={{ y: '5rem', opacity: 0 }}
                            animate={{ y: '0', opacity: 1 }}
                            transition={{ duration: 2, type: 'spring' }}
                        >
                            Discover the most <br /> suitable property <br />
                            for your needs needs !
                        </motion.h1>
                    </div>

                    <div className="flexColStart hero-des">
                        <span className="secondaryText">
                            Find your perfect home among our varied selection of
                            real estate.
                            <br /> Our team is here to help you every time stage
                            of your research.
                        </span>
                    </div>

                    <Button
                        variant="gradient"
                        size="lg"
                        radius="xl"
                        gradient={{ from: 'indigo', to: 'orange', deg: 90 }}
                        onClick={() =>
                            navigate('./properties', { replace: true })
                        }
                    >
                        Visit Properties
                    </Button>

                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={800} end={900} duration={4} />
                                <span>+</span>
                            </span>
                            <span className="secondaryText">
                                Premiums Products
                            </span>
                        </div>

                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={180} end={200} duration={4} />
                                <span>+</span>
                            </span>
                            <span className="secondaryText">
                                Happy Customers
                            </span>
                        </div>

                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={7} />
                                <span>+</span>
                            </span>
                            <span className="secondaryText">Award Wining</span>
                        </div>
                    </div>
                </div>

                {/* right side  */}
                <div className="flexCenter hero-right">
                    <motion.div
                        initial={{ x: '7rem', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 2, type: 'spring' }}
                        className="image-container"
                    >
                        <img src="./Hero2.jpg" alt="hero" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
