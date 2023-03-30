import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../redux/slices/user";

export const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const res = await getUserInfo(token);
      if (res.ok) {
        return await res.json();
      }
    },
  });
  if (isLoading) return <p> Загрузка </p>;
  if (isError) return <p> Произошла ошибка: {error} </p>;

  const handleExit = () => {
    dispatch(removeUser());
    navigate("/signin");
  };

  return (
    <>
      <div className="user_container">
        <Link to={"/"}>
          <div className="btn_back">Назад</div>
        </Link>
        <div className="user_info">
          <div className="user_name">{userData.name}</div>
          <div className="user_avatar">
            <img src={userData.avatar} alt="Avatar" />
          </div>
          <div className="user_about">{userData.about}</div>
          <div className="user_email">{userData.email}</div>
          <div className="user_group">{userData.group}</div>
        </div>
        <div className="user_btm">
          <button className="form_register" onClick={handleExit}>
            Выйти
          </button>
        </div>
      </div>
    </>
  );
};
