import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinFetch, signupFetch } from "../../api/user";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Укажите валидную почту").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  group: Yup.string()
    .min(4, "Название группы слишком короткое")
    .max(6, "Слишком длинное название группы")
    .required("Необходимо указать группу"),
});

export const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    email: "",
    group: "9-gr",
  };

  const { mutateAsync: mutateUp } = useMutation({
    mutationFn: (values) => {
      return signupFetch(values);
    },
  });

  const { mutate: mutateIn } = useMutation({
    mutationFn: async (values) => {
      const res = await signinFetch(values);
      if (res.ok) {
        const responce = await res.json();
        localStorage.setItem("token", responce.token);
        return navigate("/products");
      }

      return alert("Что то пошло не так");
    },
  });

  const onSubmit = async (values) => {
    const res = await mutateUp(values);

    if (res.ok) {
      return mutateIn({ email: values.email, password: values.password });
    }

    return alert("Что то пошло не так");
  };

  return (
    <div>
      <h1 className="main_title">Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
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

              <label htmlFor="group">Группа</label>
              <Field id="group" name="group" placeholder="jane@acme.com" />
              <ErrorMessage name="group" component="div" className="error" />

              <button type="submit" className="form_register">
                Зарегестрироваться
              </button>
            </Form>
            <p className="form_info">
              Уже есть аккаунт?{" "}
              <Link to="/signin" className="form_login">
                Войти
              </Link>
            </p>
          </div>
        </>
      </Formik>
    </div>
  );
};
