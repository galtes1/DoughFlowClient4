import React from 'react';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import TheHeader from './Header/TheHeader';
import { AnimatePresence } from 'framer-motion';
import PageFade from '../Animations/PageFade';
import { useLocation } from 'react-router-dom';


export default function Layout({children}) {

  const location = useLocation();
  return (
    <>
      <TheHeader />
      <Main>
        <AnimatePresence mode="wait">
          <PageFade keyProp={location.pathname}>
        {children}
        </PageFade>
        </AnimatePresence>
      </Main>
      <Footer/> 
    </>
  );
}