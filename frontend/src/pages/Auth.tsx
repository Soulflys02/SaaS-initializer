import LoginForm from "../features/users/components/LoginForm";
import RegisterForm from "../features/users/components/RegisterForm";
import RequestPassword from "../features/users/components/RequestPassword";

function Login() {
  return (
    <>
      <LoginForm />
      <RequestPassword />
      <RegisterForm />
    </>
  );
}

export default Login;
