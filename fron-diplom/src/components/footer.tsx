import "../styles/footer.scss";
import logoimage from "../assets/main/LOGO.svg";

const Footer = () => {
  return (
    <div className="page footer">
      <div className="page_container footer">
        <div className="header_logo">
          <img src={logoimage} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
