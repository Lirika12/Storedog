import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinFetch } from "../../api/user";
import { setUser } from "../../redux/slices/user";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Укажите валидную почту").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    email: "",
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values) => {
      const res = await signinFetch(values);
      if (res.ok) {
        const responce = await res.json();
        dispatch(
          setUser({
            ...responce.data,
            token: responce.token,
          })
        );

        return navigate("/");
      }

      return alert("Что-то пошло не так");
    },
  });

  const onSubmit = (values) => {
    mutateAsync(values);
  };

  return (
    <div>
      <h1 className="main_title">Авторизация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        <>
          <div className="form_wrapper">
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Пароль"
                type="password"
              />

              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" className="form_register">
                {" "}
                Войти{" "}
              </button>
            </Form>
            <p className="form_info">
              Вы у нас впервые?{" "}
              <Link to="/signup" className="form_login">
                Регистрация
              </Link>
            </p>
          </div>
        </>
      </Formik>
    </div>
  );
};
