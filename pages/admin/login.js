import { useState } from "react";
import Router from "next/router";
import { useUser } from "../../lib/hooks";
import LoginForm from "../../components/admin/loginForm";

const Login = () => {
  useUser({ redirectTo: "/admin", redirectIfFound: true, isAdmin: true });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      is_admin: true,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/admin");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="h-screen grid place-items-center bg-gradient-to-tr from-slate-300 dark:from-gray-800 dark:to-black">
      <LoginForm onSubmit={handleSubmit} errorMessage={errorMsg} />
    </div>
  );
};

export default Login;
