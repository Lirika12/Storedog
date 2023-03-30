export const getInitialValues  = () => {
    const lc_srore =  localStorage.getItem("reduxState")
    if (lc_srore) {

        return JSON.parse(lc_srore)
    }

    return {
        user: initialUserState,
        filter: initialFilterState
    }
}

export const initialUserState = {
    token: "",
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
    group: "",
    __v: 0
}

export const initialFilterState = {
    search: '',
}

