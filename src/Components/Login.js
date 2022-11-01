import React, { useState } from 'react';
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Login = () => {
   const [email, setEmail] = useState([]);
   const [sendPasswordResetEmail, sending, resetError] =
     useSendPasswordResetEmail(auth);
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
   const [signInWithEmailAndPassword, user, loading, error] =
     useSignInWithEmailAndPassword(auth);
   const [signInWithGoogle, googleUser, googleLoading, googleError] =
     useSignInWithGoogle(auth);

   const [signInWithGithub, githubUser, githubLoading, githubError] =
     useSignInWithGithub(auth);
   const location = useLocation();
   const navigate = useNavigate();
   const from = location?.state?.from?.pathname || "/";

   
   if (user) {
     console.log(user );
     navigate(from, { replace: true });
   }

   const onSubmit = (data) => {
     signInWithEmailAndPassword(data.email, data.password);
     console.log(data);
     setEmail(data.email);
   };
  return (
    <div>
      <div className="flex items-center justify-center mt-32   ">
        <div class=" bg-primary p-10  rounded-lg shadow-lg ">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl font-bold text-center">Log In!</h1>
            <div class="form-control mx-auto mt-5">
              <label class="label">
                <p class="label-text ">
                  Email <span className="text-red-600">*</span>
                </p>
              </label>
              <input
                type="email"
                placeholder="Email here"
                class="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is reqiured",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control mx-auto">
              <label class="label">
                <p class="label-text ">
                  Password <span className="text-red-600">*</span>
                </p>
              </label>
              <input
                type="password"
                placeholder="password here"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is reqiured",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 charecters",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <a
                onClick={async () => {
                  await sendPasswordResetEmail(email);
                  alert("Sent email");
                }}
                href=""
                class="label-text-alt  font-bold"
              >
                Forget Password?
              </a>
            </div>

            <input
              type="submit"
              value="Log in"
              className="btn bg-secondary  rounded-full 
                 hover:bg-base-100 hover:text-white hover:btn-accent mt-5 text-accent "
            />
          </form>
          <div>
            <p className=" font-light  ">
              Didn't have Account?
              <Link to="/signup" className="font-bold ">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;