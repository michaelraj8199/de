import React, {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
  } from "react";
  export const StateContext = createContext();
  
  export const StateProvider = ({ reducer, initialState, children }) => {
    // const [authState, setAuthState] = useState(null);
  
  
    // if (authState === null && data != null && data != {}) {
    // console.log("data in----->", data);

    //   setAuthState(data);
    // }
  
    return (
      <StateContext.Provider
        value={[...useReducer(reducer, initialState)]}
      >
        {children}
      </StateContext.Provider>
    );
  };
  export const useStateValue = () => useContext(StateContext);
  