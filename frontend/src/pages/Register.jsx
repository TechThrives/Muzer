import React, { useState } from "react";
import fetchService from "../services/fetchService";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const url = "/api/auth/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    };

    if (await fetchService(url, options)) {
      
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div
    class="flex items-center justify-center min-w-screen min-h-screen"
  >
    <div class="grid gap-8">
        <div
          class="border-[20px] border-transparent rounded-[20px] bg-white md:p-4 sm:p-2 m-2 max-w-sm"
        >
          <h1 class="font-bold text-xl text-center mb-6 cursor-default">
            Muzer
          </h1>
          <form onSubmit={handleRegister} class="space-y-3">
          <div>
              <input
                id="name"
                class="border p-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full ease-in-out duration-300"
                type="text"
                placeholder="Name"
                name="name"
                value={userRegister.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                id="email"
                class="border p-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full ease-in-out duration-300"
                type="email"
                placeholder="Email"
                name="email"
                value={userRegister.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                id="password"
                class="border p-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full ease-in-out duration-300"
                type="password"
                placeholder="Password"
                name="password"
                value={userRegister.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              class="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              Register
            </button>
          </form>
          <div class="flex flex-col mt-4 items-center justify-center text-sm">
            <h3>
              <span class="cursor-default">Have an account?</span>
              <a
                class="group text-blue-400 transition-all duration-100 ease-in-out"
                href="/login"
              >
                <span
                  class="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Log In
                </span>
              </a>
            </h3>
          </div>

          <div
            class="text-gray-500 flex text-center flex-col mt-4 items-center text-sm"
          >
            <p class="cursor-default">
              By signing in, you agree to our {" "}
              <a
                class="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span
                  class="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Terms{" "}
                </span>
              </a>
              and{" "}
              <a
                class="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span
                  class="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Privacy Policy
                </span>
              </a>
            </p>
          </div>
        </div>
    </div>
  </div>
  );
};

export default Register;