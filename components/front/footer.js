import Container from "./container";
import ThemeSwitch from "./themeSwitch";

const Footer = () => {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} KM&WT. All rights reserved.
      </div>
      <div className="flex items-center justify-center mt-5">
      <ThemeSwitch />
      </div>
    </Container>
  );
};

export default Footer;
