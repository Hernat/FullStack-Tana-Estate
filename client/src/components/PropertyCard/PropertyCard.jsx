/* eslint-disable react/prop-types */
import './PropertyCard.css'

import { truncate } from 'lodash'
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import Heart from '../Heart/Heart'

const PropertyCard = ({ card }) => {
    const navigate = useNavigate()
    return (
        <div
            className="flexColStart r-card"
            onClick={() => navigate(`../properties/${card.id}`)}
        >
            <Heart id={card?.id} />
            <img src={card.image} alt="home" />

            <span className="secondaryText r-price">
                <CurrencyFormat
                    value={card.price}
                    displayType={'text'}
                    thousandSeparator={' '}
                    suffix={' Ar'}
                />
            </span>

            <span className="primaryText">
                {truncate(card.title, { length: 15 })}{' '}
            </span>
            <span className="secondaryText">
                {truncate(card.description, { length: 80 })}{' '}
            </span>
        </div>
    )
}

export default PropertyCard
