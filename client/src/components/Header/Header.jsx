import { useState } from 'react'
import './Header.css'
import { BiMenuAltRight } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import useHeaderColor from '../../hooks/useHeaderColor'
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal'
import { useDisclosure } from '@mantine/hooks'
import useAuthCheck from '../../hooks/useAuthCheck'

import ProfileMenu from '../ProfileMenu/ProfileMenu'

const Header = () => {
    const [toggle, setToggle] = useState(false)
    const getMenuStyles = (toggle) => {
        if (document.documentElement.clientWidth <= 800) {
            return { right: !toggle && '-100%' }
        }
    }

    const headerColor = useHeaderColor()
    const { loginWithPopup, isAuthenticated, user, logout } = useAuth0()

    const { validateLogin } = useAuthCheck()

    const [opened, { open, close }] = useDisclosure(false)

    return (
        <section
            className="h-wrapper"
            style={{
                background: headerColor[0],
                position: headerColor[1],
            }}
        >
            <div className="paddings  innerWidth flexCenter   h-container">
                <Link to="/">
                    <img src="./Trano mora.png" alt="Logo" width={100} />
                </Link>

                <OutsideClickHandler onOutsideClick={() => setToggle(false)}>
                    <div
                        className="h-menu flexCenter"
                        style={getMenuStyles(toggle)}
                    >
                        <NavLink to="/">Accueil</NavLink>
                        <NavLink to="/properties">Properties</NavLink>
                        <a href="/#contact">Contact</a>

                        {/* Add property */}
                        <div
                            onClick={
                                isAuthenticated ? open : () => validateLogin()
                            }
                        >
                            Add Property
                        </div>
                        <AddPropertyModal opened={opened} close={close} />
                        {/* Login  */}

                        {!isAuthenticated ? (
                            <button className="button" onClick={loginWithPopup}>
                                Login
                            </button>
                        ) : (
                            <ProfileMenu user={user} logout={logout} />
                        )}
                    </div>
                </OutsideClickHandler>

                <div
                    className="menu-icon"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    <BiMenuAltRight size={30} />
                </div>
            </div>
        </section>
    )
}

export default Header
