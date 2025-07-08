import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "../pages/home/HomeView";
import InfoProjects from "../pages/infoProjects/InfoProjects";
//import InfoEducation from "@/pages/infoEducation/InfoEducation";
import { useEffect } from "react";
import { useLanguageStore } from "../store/languageStore";
import { I18nextProvider } from "react-i18next";
import i18n from "../translate/i18n";

export default function AppRouter() {
  const { isLanguageES } = useLanguageStore();

  useEffect(() => {
    i18n.changeLanguage(isLanguageES ? "es" : "en");
  }, [isLanguageES]);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/* <Route path="/education/:id" element={<InfoEducation />} /> */}
          <Route path="/project/:url" element={<InfoProjects />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}
