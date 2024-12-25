import React from "react"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import PlayingVideo from "./pages/PlayingVideo"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Auth from "./components/Auth"
import SearchResults from "./components/SearchResults"
import { ThemeProvider } from "./context/ThemeContext"
import ErrorPage from "./pages/Error"
function App() {
  return (
    <>
      <ThemeProvider>
        <div className="font-roboto">
          <Navbar />
          <Routes>
            <Route>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/video/:id" element={<PlayingVideo />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
