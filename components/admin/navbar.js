import { Navbar as NavbarFL } from "flowbite-react";

const Navbar = () => {
  return (
    <div>
      <NavbarFL fluid={true} rounded={true}>
        <NavbarFL.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </NavbarFL.Brand>
        <NavbarFL.Toggle />
        <NavbarFL.Collapse>
          <NavbarFL.Link href="/navbars" active={true}>
            Home
          </NavbarFL.Link>
          <NavbarFL.Link href="/navbars">About</NavbarFL.Link>
          <NavbarFL.Link href="/navbars">Services</NavbarFL.Link>
          <NavbarFL.Link href="/navbars">Pricing</NavbarFL.Link>
          <NavbarFL.Link href="/navbars">Contact</NavbarFL.Link>
        </NavbarFL.Collapse>
      </NavbarFL>
    </div>
  );
};

export default Navbar;
