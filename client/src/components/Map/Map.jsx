/* eslint-disable react/prop-types */
import { MapContainer, TileLayer } from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'
const Map = ({ address, city, country }) => {
    let zoom = 2
    zoom += country && 4
    zoom += city && 4
    zoom += address && 5

    return (
        <MapContainer
            center={[53.35, 18.8]}
            zoom={2}
            scrollWheelZoom={false}
            style={{
                height: '40vh',
                width: '100%',
                marginTop: '20px',
                zIndex: 0,
            }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoCoderMarker
                address={`${address} ${city} ${country}`}
                zoom={zoom}
            />
        </MapContainer>
    )
}

export default Map
