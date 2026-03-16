import mdmsImg from "../assets/Work page ongoing projects new/MDMS for utility Billing.webp";
import lightingImg from "../assets/Work page ongoing projects new/Ongoing Project – Smart Street Lighting Control  2.png";

const projectData = [
    {
        id: 101, // Using high ID to avoid conflicts
        title: "MDMS for Utility Billing",
        location: "Dubai, UAE",
        shortDesc: "Implementing a large-scale Meter Data Management System (MDMS) for a leading utility billing company in Dubai.",
        image: mdmsImg,
        details: {
            content: [
                "ConnectME Manufacturing LLC is currently implementing a large-scale Meter Data Management System (MDMS) for a leading utility billing company in Dubai, designed to support modern, transparent, and scalable utility operations across the city.",
                "Powered by our UBILL-AMR AI platform, the deployment currently manages over 25,000 smart meter nodes across 135 buildings, enabling fully automated, accurate, and reliable meter data acquisition for utility billing and operational analytics.",
                "Our smart MDMS platform provides real-time visibility into building performance, energy and water consumption patterns, and system health, allowing operators to monitor assets centrally and proactively detect anomalies. Advanced data validation and integrity checks ensure consistent, tamper-resistant data flow from meters to the billing system.",
                "By significantly reducing manual meter reading, minimizing billing disputes, and improving data accuracy, the solution enhances operational efficiency and customer trust. The system is built with a scalable, future-ready architecture, supporting city-wide expansion, advanced analytics, and seamless integration with existing utility billing and enterprise systems—strengthening Dubai’s smart infrastructure ecosystem."
            ],
            quote: "This deployment demonstrates ConnectME’s capability to deliver secure, scalable, and AI-driven MDMS solutions for modern utility billing and smart city ecosystems."
        }
    },
    {
        id: 102,
        title: "Smart Street Lighting Control System",
        location: "Communities, UAE",
        shortDesc: "Successfully implemented a Smart Street Lighting Control System for large-scale outdoor lighting across multiple communities.",
        image: lightingImg,
        details: {
            content: [
                "ConnectME Manufacturing LLC has successfully implemented a Smart Street Lighting Control System for large-scale outdoor lighting across multiple communities and residential parks within Communities.",
                "The solution leverages ConnectME’s cloud-based lighting management platform integrated with UCONNECT EDGE controllers installed at street-light feeder panels. Using the cloud platform, year-long lighting schedules are centrally configured and securely pushed to edge devices, enabling precise, real-time ON/OFF control of street lighting systems.",
                "The platform supports both automatic and manual operation modes, allowing lighting assets to be grouped into zones and controlled remotely by the operations team. In addition to lighting control, the system provides real-time energy monitoring for each feeder, offering valuable insights into consumption and operational efficiency.",
                "A dedicated maintenance and asset management module enables field teams to track assets, log maintenance activities, and respond proactively to faults. The cloud engine automatically generates daily, weekly, and monthly reports, including energy usage, operational status, trips, and error events—ensuring complete visibility and auditability of the lighting infrastructure.",
                "To enhance operational responsiveness, automated alerts and notifications are triggered by the EDGE controllers under abnormal conditions. These alerts are delivered via WhatsApp groups shared across maintenance teams, operations teams, and community management—ensuring faster fault resolution and uninterrupted lighting services.",
                "The deployment empowers community teams with a reliable, scalable, and intelligent street lighting system, simplifying asset management, reducing operational overheads, and improving overall service quality across communities."
            ],
            features: [
                { label: "Centralized Cloud Lighting Control", desc: "Configure and manage street lighting schedules centrally through a secure cloud platform." },
                { label: "Year-Round Automated Scheduling", desc: "Predefined ON/OFF schedules pushed directly to edge devices for reliable operation." },
                { label: "Real-Time Energy Monitoring", desc: "Live monitoring of energy consumption for each feeder panel." },
                { label: "AUTO & Manual Operation", desc: "Flexible control with zoning, overrides, and manual command execution from the cloud." },
                { label: "Maintenance & Asset Management", desc: "Track lighting assets, maintenance activities, and fault history in one platform." },
                { label: "Automated Reports & Analytics", desc: "Daily, weekly, and monthly reports covering energy, faults, trips, and system health." },
                { label: "Instant Alerts & WhatsApp Notifications", desc: "Automated alerts triggered by EDGE devices and delivered instantly to teams." },
                { label: "UCONNECT EDGE – Multi-Protocol Gateway", desc: "Supports MQTT, HTTPS, FTP, Modbus, BACnet, and LoRaWAN forwarder gateway for seamless integration." }
            ],
            quote: "This smart street lighting deployment demonstrates ConnectME’s capability to deliver cloud-driven, edge-enabled infrastructure solutions that enhance operational efficiency, asset visibility, and community service excellence."
        }
    }
];

export default projectData;
