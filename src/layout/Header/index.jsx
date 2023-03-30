import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Search } from "../../components/Search";

export const Header = () => {
  const { token } = useSelector((state) => state.user);

  return (
    <header className="header_wrapper">
      <div className="header_content">
        <NavLink to={"/userinfo"} className="header_link">
          <div className="header_user">Личный кабинет</div>
        </NavLink>
        <div className="header_title">Store Dog</div>
        {token && <Search />}
      </div>
    </header>
  );
};
