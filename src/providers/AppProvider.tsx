
import React, { useState, createContext } from 'react'


const initialState = {
  friends: [],
  messages: [],
  user: {},
}

export const AppContext = createContext<any>(null)


export const AppProvider = ({ children }: any) => {
  const [friends, setFriends] = useState({})
  const [messages, setMessages] = useState([])
  const [userData, setUserData] = useState({})
  const [data, setData] = useState(initialState)

  return (
    <AppContext.Provider value={{ 
      friends, setFriends,
      messages, setMessages,
      userData, setUserData,
      data, setData 
      }}>
      {children}
    </AppContext.Provider>
  );
};