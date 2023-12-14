import { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import { MdOutlineArrowDropDown } from 'react-icons/md'

import data from '../../utils/accordion'

import './Value.css'

const Value = () => {
    const [className, setClassName] = useState(0)
    return (
        <section id="value" className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                {/* left side */}
                <div className="v-left">
                    <div className="image-container">
                        <img src="./Value.jpg" alt="" />
                    </div>
                </div>

                {/* right side  */}
                <div className="flexColStart v-right">
                    <span className="orangeText">Our value</span>
                    <span className="primaryText">Value We Give to You</span>
                    <span className="secondaryText">
                        We always ready to help by providijng the best services
                        for you. <br />
                        We beleive a good blace to live can make your life
                        better
                    </span>

                    <Accordion
                        className="accordion"
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >
                        {data.map((acc, index) => {
                            return (
                                <AccordionItem
                                    className={`accordionItem ${
                                        className === index
                                            ? 'expanded'
                                            : 'collapse'
                                    }`}
                                    key={index}
                                    uuid={index}
                                    onClick={() => setClassName(index)}
                                >
                                    <AccordionItemHeading>
                                        <AccordionItemButton className="flexCenter accordionButton">
                                            <div className="flexCenter icon">
                                                {acc.icon}
                                            </div>
                                            <span className="primaryText">
                                                {acc.heading}
                                            </span>
                                            <div className="flexCenter icon">
                                                <MdOutlineArrowDropDown
                                                    size={20}
                                                />
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        <p className="secondaryText">
                                            {acc.detail}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default Value
