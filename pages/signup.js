import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import SignupForm from "../components/front/signupForm";
import Navbar from "../components/front/navbar";
import Footer from "../components/front/footer";

const Signup = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("/api/front/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/login");
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
      <div className="h-screen grid items-start justify-items-center bg-gradient-to-tr  dark:from-gray-800 dark:to-black">
        <SignupForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <Footer />
    </>
  );
};

export default Signup;
