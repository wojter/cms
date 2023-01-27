import Navbar from "../components/front/navbar";
import Footer from "../components/front/footer";
import Container from "../components/front/container";

const About = () => {
  return (
    <div>
      <Navbar />
      <Container>
      <div className="max-w-screen-md mx-auto ">
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <h2 className="mt-2 mb-3 text-lg font-normal tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">We are a small passionate team.</h2>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
