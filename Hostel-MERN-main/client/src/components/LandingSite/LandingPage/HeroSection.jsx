// import { HeroSVG } from "./HeroSVG";
// import { Link } from "react-router-dom";

// function HeroSection() {
//   return (
//     <main
//       className="flex flex-col lg:flex-row-reverse justify-center align-center text-center bg-cover bg-center bg-no-repeat text-white"
//       style={{
//         backgroundImage:
//           "url('/mnt/data/Screenshot (30).png')",  // <-- UPDATED IMAGE
//       }}
//     >
//       <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
//         <HeroSVG />
//       </div>

//       <div className="md:pt-[8%]">
//         <h1 className="font-bold text-6xl">
//           <span className="text-blue-500">BRIDGING HOSTEL LIFE</span>
//         </h1>

//         <p className="py-10 text-2xl text-blue-500">
//           One Solution For All Of The Hostel&apos;s Needs
//         </p>

//         <div className="py-20">
//           <Link
//             to="/auth/login"
//             className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl text-white"
//           >
//             Login
//           </Link>

//           <p className="mt-6 mb-3 text-blue-500">OR</p>

//           <Link
//             to="/auth/request"
//             className="text-xl hover:underline hover:text-blue-700 text-blue-500"
//           >
//             Request Registration
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

// export { HeroSection };

import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main
      className="flex flex-col lg:flex-row-reverse justify-center items-center 
                 text-center bg-cover bg-center bg-no-repeat text-white min-h-screen"
      style={{
        backgroundImage: `url(/assets/hero-bg.jpg)`, // ✅ public folder reference
      }}
    >
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <HeroSVG />
      </div>

      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl">
          <span className="text-white-500">WELLCOME TO HOSTEL </span>
        </h1>

        <p className="py-10 text-2xl text-white-500">
          One Solution For All Of The Hostel&apos;s Needs
        </p>

        <div className="py-20">
          <Link
            to="/auth/login"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            Login
          </Link>

          <p className="mt-6 mb-3 text-white-500">OR</p>

          <Link
            to="/auth/request"
            className="text-xl hover:underline hover:text-white-700 text-white-500"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}

export { HeroSection };
