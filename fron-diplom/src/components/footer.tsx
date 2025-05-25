import "../styles/footer.scss";
import logoimage from "../assets/main/logo2.png";

const Footer = () => {
  return (
    <div className="page footer">
      <div className="page_container footer">
        <div className="header_logo">
          <img src={logoimage} alt="logo" width={"75px"}/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
