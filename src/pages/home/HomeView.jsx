import { useEffect } from "react";
import styles from "./HomeView.module.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "./sections/header/Header";
import Projects from "./sections/projects/Projects";
import About from "./sections/about/About";
//import Education from "./sections/education/Education";
import MyFooter from "../../components/footer/MyFooter";
import Contact from "./sections/contact/Contact";
import { NotificationProvider } from "../../components/notificationProvider/notificationProvider";
import { setupGlobalAnchorHandling } from "../../hooks/handleScroll";

const HomeView = () => {
  // Configurar manejo global de enlaces con anclas
  useEffect(() => {
    const cleanup = setupGlobalAnchorHandling();
    return cleanup;
  }, []);

  return (
    <NotificationProvider>
      <div id="container" className={styles.container}>
        <Navbar />
        <Header />
        <About />
        {/*        <Education /> */}
        <Projects />
        <Contact />
        <MyFooter />
      </div>
    </NotificationProvider>
  );
};

export default HomeView;
