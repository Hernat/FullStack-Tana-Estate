import { useEffect, useState } from 'react'

const useHeaderColor = () => {
    const [headerColor, setHeaderColor] = useState('#010716')
    //to handle shadow of header
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 28) {
                setHeaderColor('#1e336c')
            } else {
                setHeaderColor('#010716')
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return [headerColor, 'fixed']
}

export default useHeaderColor
