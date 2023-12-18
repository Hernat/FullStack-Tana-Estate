import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core'

// Les configs en bas sont pour 'offline'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-8z7ps75p60nb6lgc.us.auth0.com"
            clientId="AcmukBYnyB492tJT9pYcZmBu4eUwgneJ"
            authorizationParams={{
                redirect_uri: 'https://tana-estate.vercel.app',
            }}
            //===============OFFLINE=============

            // domain="dev-8z7ps75p60nb6lgc.us.auth0.com"
            // clientId="6XRi7S8iwCXIyhSFekRP4q5dVElo84QX"
            // authorizationParams={{
            //     redirect_uri: 'http://localhost:5173',
            // }}
            audience="http://localhost:8000"
            scope="openid profile email"
        >
            <MantineProvider>
                <App />
            </MantineProvider>
        </Auth0Provider>
    </React.StrictMode>
)
