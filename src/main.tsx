import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import moment from "moment/min/moment-with-locales";
import { Overlay } from "snapdrag";

moment.locale("pt-br");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <App />
      <Overlay/>
    </ChakraProvider>
  </StrictMode>,
)
