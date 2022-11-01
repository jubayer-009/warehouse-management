import React, { useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from './Loading';

const SignUp = () => {
   const [passwordError, setPasswordError] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const from = location?.state?.from?.pathname || "/";

   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
   const [createUserWithEmailAndPassword, user, loading, error] =
     useCreateUserWithEmailAndPassword(auth);
   const [signInWithGoogle, googleUser, googleLoading, googleError] =
     useSignInWithGoogle(auth);
   // const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
   //   useSignInWithFacebook(auth);
   const [signInWithGithub, githubUser, githubLoading, githubError] =
     useSignInWithGithub(auth);
   
   if (user) {
     console.log(user);
     navigate(from, { replace: true });
   }
   if (loading ) {
     return <Loading></Loading>;
   }

   const onSubmit = (data) => {
     if (data.password !== data.confirmPassword) {
       setPasswordError("Password Didn't matched");
       return;
     }
     createUserWithEmailAndPassword(data.email, data.password);
     console.log(data);
   };
  return (
    <div className="py-8  flex items-center justify-center">
      <div class="bg-primary p-10 rounded-lg shadow-lg  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-bold text-center">Sign Up!</h1>
          <div class="form-control  ">
            <label class="label">
              <span class="label-text ">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your Name here"
              class="input input-bordered w-full max-w-xs"
              {...register("name")}
            />
          </div>
          <div class="form-control mx-auto">
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
          </div>
          <div class="form-control mx-auto">
            <label class="label">
              <p class="label-text ">
                Confirm password <span className="text-red-600">*</span>
              </p>
            </label>
            <input
              type="password"
              placeholder="Re-type password "
              class="input input-bordered w-full max-w-xs"
              {...register("confirmPassword", {
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
              {passwordError ? (
                <span class="label-text-alt text-red-500">{passwordError}</span>
              ) : (
                <span class="label-text-alt text-red-500"></span>
              )}
            </label>
          </div>

          {
            <input
              type="submit"
              value="Sign Up"
              className="btn bg-secondary  rounded-full 
                 hover:bg-base-100 hover:text-white hover:btn-accent mt-5 text-accent "
            />
          }
        </form>
        <div>
          <p className=" font-light my-3 ">
            Already Have account?
            <Link to="/login" className="font-bold ">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;