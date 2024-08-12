import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Checkbox } from "antd";
import { useAuthStore } from "../store/authStore";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { loginUserHandler } = useAuthStore();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const loginUser = async (value, actions) => {
    const data = {
      password: value.password,
      username: value.username,
    };

    setIsLoading(true);
    loginUserHandler(data);
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(value, actions) => {
            loginUser(value, actions);
          }}
        >
          {(props) => {
            return (
              <>
                <div className="flex w-screen min-h-screen h-full items-center">
                  <div className="flex justify-center mx-auto flex-col px-11 py-8 bg-white h-fit rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        Login Web Internal PT Ondel
                      </p>
                    </div>
                    <div>
                      <Form className="mt-8 space-y-6" action="#" method="POST">
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="rounded-md">
                          <div className="my-6">
                            <label
                              htmlFor="username"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Username
                            </label>
                            <div className="mt-2">
                              <Field
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="pl-4 shadow-sm relative block w-[94%] h-11 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6 "
                                placeholder="Username"
                              />
                            </div>
                            <ErrorMessage
                              component="div"
                              name="username"
                              style={{ color: "red", fontSize: "12px" }}
                            />
                          </div>

                          <div className="mt-6 mb-2">
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Password
                            </label>
                            <div className="mt-2">
                              <Field
                                id="password"
                                name="password"
                                type={show ? "text" : "password"}
                                required
                                className="pl-4 shadow-sm relative block w-[94%] h-11 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                placeholder="Password"
                              />
                            </div>
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red", fontSize: "12px" }}
                            />
                          </div>
                        </div>
                        <Checkbox
                          style={{
                            background: "transparent",
                            color: "black",
                            marginTop: "0px",
                          }}
                          onChange={(event) => setShow(event.target.checked)}
                        >
                          <p style={{ fontSize: "14px" }}>Show Password</p>
                        </Checkbox>
                        <div>
                          <Button
                            loading={isLoading}
                            htmlType="submit"
                            type="primary"
                            className="w-full rounded-md text-white bg-blue-500 border-none h-11 text-lg"
                          >
                            Login
                          </Button>
                          <div className="flex flex-wrap gap-2 items-end justify-start my-4">
                            <p className="cursor-pointer text-color-green underline text-sm lg:text-md hover:text-cyan-900">
                              Forgot Password?
                            </p>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
