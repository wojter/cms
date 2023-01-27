import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Navbar from "../components/front/navbar";
import Footer from "../components/front/footer";
import Container from "../components/front/container";
import LoginForm from "../components/front/loginForm";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true, isAdmin: false });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      is_admin: false,
    };

    try {
      const res = await fetch("/api/front/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  }
  return (
    <>
      <Navbar />
      <Container>
        <div className="h-screen grid place-items-center bg-gradient-to-tr from-slate-100 dark:from-gray-800 dark:to-black">
          <LoginForm onSubmit={handleSubmit} errorMessage={errorMsg} />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
