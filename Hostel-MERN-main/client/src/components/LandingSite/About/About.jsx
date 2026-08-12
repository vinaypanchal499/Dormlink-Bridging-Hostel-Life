import { TeamCard } from "./TeamMember";

function About() {
 

  const abc = {
    name: "GNDEC HOSTEL",
    designation: "Bidar",
    image: "https://static.careers360.mobi/media/presets/720X480/colleges/social-media/media-gallery/4316/2018/8/3/Guru-Nanak-Dev-Engineering-College-Bidar-hostel-mess.jpg",
    links: [
      
      "https://gndecb.ac.in/hostel.html",
      
    ],
  };
  

  
  
  const def = {
    name: "BCWD ENG HOSTEL",
    designation: "Bidar",
    image:
      "https://files.yappe.in/place/full/bcwd-engineering-medical-hostel-3330566.webp",
    links: [
      "https://maps.app.goo.gl/ezmhxGqWKFPW7mkv8",
      
    ],
  };

  

  const ghi = {
    name: "GNDEC GIRLS H",
    designation: "Bidar",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    links: [
      
      "https://www.google.com/search?q=gndec+girls+hostel+bidar",
      
    ],
  };

  const mno = {
    name: "GNDEC  HOSTEL",
    designation: "Bidar",
    image:
      "https://www.ashgndec.in/images/c22.jpg",
    links: [
      
      "https://maps.app.goo.gl/cYxFiZgPQWdr1TyD7",
    ],
  };

  const jkl = {
    name: "BOYS & GIRLS PG",
    designation: "Bidar",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    links: [
      
      "https://maps.app.goo.gl/sPz3PdRxj3Heirav8",
    ],
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        HOSTEL DETAILS!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        
        <TeamCard member={mno} />
        <TeamCard member={abc} /> 
        <TeamCard member={ghi} />  
        <TeamCard member={def} />
        <TeamCard member={jkl} />
        
        
        
      </div>
    </>
  );
}

export { About };