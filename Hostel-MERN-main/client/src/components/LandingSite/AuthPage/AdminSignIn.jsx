import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function AdminSignIn() {
  let navigate = useNavigate();
  
  const getHostel = async () => {
    let admin = JSON.parse(localStorage.getItem("admin"));
    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: admin._id })
      });

      const data = await res.json();
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {}
  };

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);

    let data = {
      email: inputEmail,
      password: pass,
    };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    if (result.success) {
      localStorage.setItem("token", result.data.token);

      let admin = await fetch("http://localhost:3000/api/admin/get-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: result.data.user.isAdmin,
          token: result.data.token
        })
      });

      let adminResult = await admin.json();
      if (adminResult.success) {
        localStorage.setItem("admin", JSON.stringify(adminResult.admin));
        await getHostel();
        navigate("/admin-dashboard");
      } else {
        toast.error(adminResult.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } else {
      toast.error(result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  const changeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const email = {
    name: "email",
    type: "email",
    placeholder: "abc@email.com",
    req: true,
    value: inputEmail,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
    value: pass,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-white border border-gray-300 shadow-md">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-900">
          Sign in to your account - Manager
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          
          <Input field={email} />
          <Input field={password} />

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 border-gray-400 focus:ring-blue-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>

          <ToastContainer theme="dark" />

          <p className="text-sm font-light text-gray-600">
            You&apos;re a student?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Signin Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
