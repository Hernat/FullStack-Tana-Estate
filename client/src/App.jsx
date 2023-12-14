import { useState } from 'react'
import UserDetailContext from './context/UserDetailContext.js'
import Website from './pages/Website'
import Properties from './pages/Properties/Properties'
import Property from './pages/Property/Property'
import Bookings from './pages/Bookings/Bookings'
import Favorites from './pages/Favorites/Favorites'
import MyProperties from './pages/MyProperties/MyProperties'

import Layout from './components/Layout/Layout'
import { Suspense } from 'react'

import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'dayjs/locale/fr'
import { DatesProvider } from '@mantine/dates'

function App() {
    const queryClient = new QueryClient()
    const [userDetails, setUserDetails] = useState({
        favorites: [],
        bookings: [],
        token: null,
    })

    return (
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            <QueryClientProvider client={queryClient}>
                <DatesProvider
                    settings={{
                        locale: 'fr',
                        firstDayOfWeek: 1,
                        timezone: 'Indian/Antananarivo',
                    }}
                >
                    <BrowserRouter>
                        <Suspense fallback={<div>Loading ....</div>}>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Website />} />

                                    <Route path="/properties">
                                        <Route index element={<Properties />} />
                                        <Route
                                            path=":propertyId"
                                            element={<Property />}
                                        />
                                    </Route>
                                    <Route
                                        path="/bookings"
                                        element={<Bookings />}
                                    />
                                    <Route
                                        path="/favorites"
                                        element={<Favorites />}
                                    />
                                    <Route
                                        path="/myProperties"
                                        element={<MyProperties />}
                                    />
                                </Route>
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </DatesProvider>
                <ToastContainer />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </UserDetailContext.Provider>
    )
}

export default App
