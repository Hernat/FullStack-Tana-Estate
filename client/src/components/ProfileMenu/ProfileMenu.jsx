/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Menu, rem } from '@mantine/core'
import '@mantine/core/styles.css'

import { TbLogout2 } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineDateRange } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'

const ProfileMenu = ({ user, logout }) => {
    const navigate = useNavigate()
    return (
        <Menu>
            <Menu.Target>
                <Avatar
                    src={user?.picture}
                    variant="filled"
                    radius="lg"
                    color="indigo"
                />
            </Menu.Target>
            <Menu.Dropdown className="dropdown">
                <Menu.Item
                    leftSection={<FaHeart size={15} />}
                    onClick={() => navigate('./favorites', { replace: true })}
                >
                    Favorites
                </Menu.Item>
                <Menu.Item
                    leftSection={<MdOutlineDateRange size={15} />}
                    onClick={() => navigate('./bookings', { replace: true })}
                >
                    Bookings
                </Menu.Item>
                <Menu.Item
                    leftSection={<IoHome size={15} />}
                    onClick={() =>
                        navigate('./myProperties', { replace: true })
                    }
                >
                    My Properties
                </Menu.Item>

                <Menu.Item
                    style={{ color: 'red' }}
                    onClick={() => {
                        localStorage.clear()
                        logout()
                    }}
                    leftSection={<TbLogout2 size={15} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ProfileMenu
