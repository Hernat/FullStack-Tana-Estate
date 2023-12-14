export const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
        480: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        750: {
            slidesPerView: 3,
        },
        1100: {
            slidesPerView: 4,
        },
    },
}

export const updateFavorites = (id, favorites = []) => {
    const isIdPresent = favorites.includes(id)
    return isIdPresent
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id]
}

export const checkFavorites = (id, favorites) => {
    return favorites?.includes(id) ? '#fa3e5f' : 'white'
}

export const validateString = (value) => {
    return value?.length < 3 || value === null
        ? 'Must have     more 3 characters'
        : null
}
