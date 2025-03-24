import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className=" text-white py-4 z-50 text-sm md:text-lg">
      <div className="contaier mx-auto">
        <p className="text-center text-gray-300">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}{" "}
          <a
            className="text-gray-400 hover:underline underline-offset-4"
            href="https://santiagotorres-web-developer.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Metatech
          </a>{" "}
          &{" "}
          <a
            className="text-gray-400 hover:underline underline-offset-4"
            href="https://midu.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Midudev
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
