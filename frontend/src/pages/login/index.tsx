import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import Message from "../../components/global/Message";
import images from "../../constants/images";
import { HOME, REGISTRATION } from "../../constants/routes";
import { validateUserLoginForm } from "../../helpers/validateFormData";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    prepareUserLogin,
    selectAuth,
} from "../../redux/features/login/loginSlice";
import { LoginFormData, LoginFormError } from "../../types/types";

const Login = () => {
    const navigate = useNavigate();
    const { error, isError, isLoading, token, user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState<LoginFormError>({
        emailError: "",
        passwordError: "",
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlerUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const getValidData = validateUserLoginForm(formData);
        setFormError(getValidData);

        if (Object.keys(getValidData).length === 0) {
            const reqData = {
                username: formData.email,
                password: formData.password,
            };
            dispatch(prepareUserLogin(reqData));
        }
    };

    useEffect(() => {
        if (user && token) {
            navigate(HOME);
        }
    }, [navigate, token, user]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            {/* Left Form Side */}
            <div className="bg-slate-100 flex items-center justify-center py-8 px-4">
                <div className="w-full max-w-md">
                    {/* Logo on small screens */}
                    <div className="flex mb-8 justify-center lg:hidden">
                        <Link to={HOME}>
                            <img
                                alt="logo"
                                className="w-[150px] xs:w-[180px] sm:w-[200px] lg:w-[300px] object-contain"
                                src={images.logoBlack}
                            />
                        </Link>
                    </div>

                    {/* Welcome Text */}
                    <div className="mb-6">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-sm md:text-lg mt-2">
                            Welcome back! Please enter your details
                        </p>
                    </div>

                    {/* Form Inputs */}
                    <form>
                        <Input
                            onChange={handleChange}
                            name="email"
                            message={formError.emailError}
                            label="Email"
                            placeholder="Enter your email"
                            value={formData.email}
                        />
                        <Input
                            onChange={handleChange}
                            name="password"
                            message={formError.passwordError}
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            type="password"
                        />

                        {/* Forget Password Link */}
                        <div className="flex justify-end mb-4">
                            <button
                                type="button"
                                className="text-primary-500 cursor-pointer hover:underline focus:outline-none"
                            >
                                Forget Password?
                            </button>
                        </div>

                        {/* Sign in Button */}
                        <Button
                            onClick={handlerUserLogin}
                            title="Sign in"
                            loading={isLoading}
                        />

                        {/* Signup Redirect */}
                        <div className="flex items-center justify-center mt-6 space-x-2">
                            <p className="text-sm text-gray-600">
                                Don't have an account?
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate(REGISTRATION)}
                                className="text-primary-500 cursor-pointer font-semibold hover:underline transition"
                            >
                                Sign up
                            </button>
                        </div>

                        {/* Error Message */}
                        {isError && <Message error={isError} message={error} />}
                    </form>
                </div>
            </div>

            {/* Right Image Side */}
            <div className="bg-gray-700 hidden lg:flex items-center justify-center">
                <Link to={HOME}>
                    <img
                        alt="logo"
                        className="w-[150px] xs:w-[180px] sm:w-[200px] lg:w-[300px] object-contain"
                        src={images.logo}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Login;
