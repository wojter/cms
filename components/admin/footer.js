import { Footer as FooterFL } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const Footer = () => {
  return (
    <FooterFL container={true}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterFL.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Flowbite"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterFL.Title title="about" />
              <FooterFL.LinkGroup col={true}>
                <FooterFL.Link href="#">Flowbite</FooterFL.Link>
                <FooterFL.Link href="#">Tailwind CSS</FooterFL.Link>
              </FooterFL.LinkGroup>
            </div>
            <div>
              <FooterFL.Title title="Follow us" />
              <FooterFL.LinkGroup col={true}>
                <FooterFL.Link href="#">Github</FooterFL.Link>
                <FooterFL.Link href="#">Discord</FooterFL.Link>
              </FooterFL.LinkGroup>
            </div>
            <div>
              <FooterFL.Title title="Legal" />
              <FooterFL.LinkGroup col={true}>
                <FooterFL.Link href="#">Privacy Policy</FooterFL.Link>
                <FooterFL.Link href="#">Terms & Conditions</FooterFL.Link>
              </FooterFL.LinkGroup>
            </div>
          </div>
        </div>
        <FooterFL.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterFL.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterFL.Icon href="#" icon={BsFacebook} />
            <FooterFL.Icon href="#" icon={BsInstagram} />
            <FooterFL.Icon href="#" icon={BsTwitter} />
            <FooterFL.Icon href="#" icon={BsGithub} />
            <FooterFL.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FooterFL>
  );
};

export default Footer;
