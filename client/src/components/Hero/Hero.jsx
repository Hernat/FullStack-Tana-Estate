import './Hero.css'
import SearchBar from '../SearchBar/SearchBar'

import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const Hero = () => {
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
                            Découvrez <br />
                            la propriété <br /> la plus adaptée <br />à vos
                            besoins !
                        </motion.h1>
                    </div>

                    <div className="flexColStart hero-des">
                        <span className="secondaryText">
                            Trouvez votre chez-vous parfait parmi notre
                            sélection variée de biens immobiliers.
                            <br /> Notre équipe est là pour vous aider à chaque
                            étape de votre recherche.
                        </span>
                    </div>

                    <SearchBar />

                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                            </span>
                            <span className="secondaryText">
                                Premiums Products
                            </span>
                        </div>

                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={1850} end={2000} duration={4} />
                                <span>+</span>
                            </span>
                            <span className="secondaryText">
                                Happy Customers
                            </span>
                        </div>

                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={28} />
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
