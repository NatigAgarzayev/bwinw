import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from './pages/Main.tsx'
import FamilyTree from './pages/FamilyTree.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<FamilyTree />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </Provider>
)
