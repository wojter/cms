import Container from "./container";

const Footer = () => {
  return (
    <Container className="border-t border-gray-200">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} KM&WT. All rights reserved.
      </div>
    </Container>
  );
};

export default Footer;
