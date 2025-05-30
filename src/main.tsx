import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast';

import App from './App.tsx'
import { QueryProvider } from './lib/tanstackQuery.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryProvider>
            <BrowserRouter>
                <App />
                <Toaster />
            </BrowserRouter>
        </QueryProvider>
    </StrictMode>,
)
