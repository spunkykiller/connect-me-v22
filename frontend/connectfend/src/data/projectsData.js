import palmTowerImg from "../assets/work page Our Projects/THE PALM TOWER.webp";
import fiveLuxeImg from "../assets/work page Our Projects/FIVE LUXE, JBR.webp";
import festivalPlazaImg from "../assets/work page Our Projects/Festival Plaza Mall.webp";
import streetLightImg from "../assets/work page Our Projects/Dubai Hills Park - IoT Lighting.webp";

// New Projects from Ongoing
import viaRiyadhImg from "../assets/work page Our Projects/ongoing projects/Via Riyadh Mall.webp";
import ncmImg from "../assets/work page Our Projects/ongoing projects/National Centre of Meteorology.webp";
import laysenValleyImg from "../assets/work page Our Projects/ongoing projects/Laysen Valley.webp";
import mchImg from "../assets/work page Our Projects/ongoing projects/Maternity and Children Hospital.webp";
import kshImg from "../assets/work page Our Projects/ongoing projects/King Salman Specialist Hospital.webp";

const projects = [
  {
    id: 1,
    title: "The Palm Tower",
    location: "Dubai, UAE",
    desc: "Implemented centralized IBM Meter Data Management platform integrating five different BTU meter brands. Standardized meter data collection, processing, and reporting across all brands, enabling real-time monitoring and fault detection.",
    image: palmTowerImg
  },
  {
    id: 2,
    title: "Five Luxe, JBR",
    location: "JBR, Dubai, UAE",
    desc: "Integrated BTU, Hot Water, Cold Water, and Flush Water meters into a centralized IBM AMR software platform. Enabled automated meter reading for all utilities, improving billing accuracy and reducing manual data handling.",
    image: fiveLuxeImg
  },
  {
    id: 3,
    title: "Festival Plaza Mall",
    location: "Dubai, UAE",
    desc: "Deployed non-intrusive clamp-on BTU meters for accurate energy monitoring across retail outlets. The solution avoided system shutdowns and integrated seamlessly with the BMS, delivering billing-grade accuracy.",
    image: festivalPlazaImg
  },
  {
    id: 4,
    title: "Dubai Hills Park - IoT Street Lighting",
    location: "Dubai, UAE",
    desc: "IoT-based connectivity solution for feeder pillars with remote ON/OFF control and real-time power monitoring. Integrated with a cloud platform for centralized management of street lighting.",
    image: streetLightImg
  },
  {
    id: 5,
    title: "VIA Riyadh Mall",
    location: "Riyadh, KSA",
    desc: "MBUS BTU and Electric meters data integration to IBM Software 150node for data analysis and billing.",
    image: viaRiyadhImg
  },
  {
    id: 6,
    title: "National Centre of Meteorology",
    location: "Jeddah, KSA",
    desc: "Supply and installation of Teckhnave Clamp on BTU/Flow Meter.",
    image: ncmImg
  },
  {
    id: 7,
    title: "Laysen Valley",
    location: "Riyadh, KSA",
    desc: "BTU meters, Hot Water, Cold water and Electric Meter data integration to IBM Software 600 nodes for data analysis and billing.",
    image: laysenValleyImg
  },
  {
    id: 8,
    title: "Maternity and Children Hospital",
    location: "Hail, KSA",
    desc: "Supply and installation of Teckhnave Clamp on BTU/Flow Meter.",
    image: mchImg
  },
  {
    id: 9,
    title: "King Salman Specialist Hospital",
    location: "KSA",
    desc: "Supply and installation of Teckhnave Clamp on BTU/Flow Meter.",
    image: kshImg
  }
];

export default projects;
