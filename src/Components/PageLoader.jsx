import logo from "../assets/logo.webp";
import "./PageLoader.css"; // import custom CSS

const PageLoader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Spinning Circle Outline */}
        <div className="loader-circle"></div>

        {/* Logo with pulse */}
        <img
          src={logo}
          alt="logo"
          draggable="false"
          className="loader-logo"
        />
      </div>
    </div>
  );
};

export default PageLoader;
