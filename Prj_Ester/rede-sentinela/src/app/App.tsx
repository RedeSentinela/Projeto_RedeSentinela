import React, { useState, useEffect, useRef } from "react";

import Toast from "../components/ui/Toast";

import Loading from "../pages/loading/Loading";
import Welcome from "../pages/welcome/Welcome";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";

export default function App() {
  const [page, setPage] = useState("loading");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPage("welcome"), 2200);
    return () => clearTimeout(t);
  }, []);

  const flashToast = (text: string) => {
    setToast(text);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="rs-app">
      <div className="rs-phone">
        {page === "loading" && <Loading />}
        {page === "welcome" && <Welcome onNext={() => setPage("signup")} />}
        {page === "signup" && (
          <Signup
            onGoLogin={() => setPage("login")}
            onSubmit={() => {
              flashToast("Conta criada! Vamos fazer login.");
              setTimeout(() => setPage("login"), 900);
            }}
          />
        )}
        {page === "login" && (
          <Login
            onGoSignup={() => setPage("signup")}
            onSubmit={() => flashToast("Bem-vinda(o) de volta!")}
          />
        )}
        <Toast text={toast} />
      </div>
    </div>
  );
}
