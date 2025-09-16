// import logo from "../../assets/logo.png";

const PageLoader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* Spinning Circle Outline */}
        <div className="absolute w-50 h-50 border-6 border-[#A6ADBB] border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>

        {/* Logo */}
        <img
          src="https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/120-cool-logos-for-a-fresh-new-look/gaming-battle-soldier-sword-by-amcstudio-brandcrowd.png"
          alt="logo"
          draggable="false"
          className="w-40 select-none"
        />
      </div>
    </div>
  );
};

export default PageLoader;
