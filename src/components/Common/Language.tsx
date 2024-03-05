'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Language = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleLanguage = (language: string) => {
    const paths = router.asPath?.split('?');
    if (paths && paths.length) {
      window.location.pathname = `/${language}${paths[0]}`;
    }
  };

  useEffect(() => {
    if (router?.locale) {
      setSelectedLanguage(router?.locale);
    }
  }, []);

  return (
    <div>
      {
        selectedLanguage === 'en'
          ? <span className="text-20 cursor-pointer" onClick={() => { handleLanguage('ar') }}>العربية</span>
          : <span className="text-20 cursor-pointer" onClick={() => { handleLanguage('en') }}>English</span>
      }
    </div>
  )
}

export default Language;