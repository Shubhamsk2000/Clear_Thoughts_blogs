import { createContext, useState, useRef } from "react";

export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function GlobalState({ children }) {

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const [imageURL, setImageURL] = useState({});

    return (
        <GlobalContext.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData,
            imageURL,
            setImageURL
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

