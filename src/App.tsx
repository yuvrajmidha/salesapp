import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./layout/Layout";
import { theme } from "./theme";
import { Codbrix } from "./@codbrix/components/provider";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import store from './@codbrix/store'
import { Provider } from 'react-redux'

import './styles.css'
import './css/codeflask.css'
import 'react-quill/dist/quill.bubble.css';
import PublicRoutes from "./views/PublicRoutes";
import RenderPage from "./views/RenderPage";
import Operations from "./views/Operations";

var BASE_URL = `http://localhost:3000`;
BASE_URL = `https://hellopos.net.au`; 


export const App = () => {

  React.useEffect(() => {
    console.log("Welcome to Bepoz Oolio CMS")
  }, [])

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<Codbrix base_url={BASE_URL} />}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/cms' element={<Home/>}/>
                  <Route path='/cms/gplist' element={<Home/>}/>
                  <Route element={<Layout />}>
                    <Route path="/cms/:page" element={<RenderPage/>} />
                    <Route path="/cms/:page/:id" element={<Operations/>} />
                    <Route path="/404" element={<>404 Not Found</>} />
                  </Route>
                  <Route path="/public/:page/:route" element={<PublicRoutes/>} />
                </Route>
            </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  )
};
