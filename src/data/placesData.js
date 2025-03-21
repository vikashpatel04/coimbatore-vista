import marudhamalai from "/marudhamalai.webp";
import brookefields from "/Brookefields_Mall.jpg";
import blackthunder from "/black_thunder.jpg";
import BusStop from "/bus_stand.png";
import Dhyanalinga from "/Dhyanalinga_Temple.jpg";
import KovaiKondattam from "/Kovai_Kondattam.webp";
import Siruvani from "/Siruvani_Waterfalls.jpg";
import VOC from "/VOC_Park_and_Zoo.jpg";


export const placesData = [
    { 
      id: 1, 
      name: "Marudhamalai Temple", 
      category: "Tourist", 
      rating: 4.8,
      timing: "6 AM - 8 PM", 
      ticket: "Free", 
      location: "15 km from Coimbatore city",
      description: "Marudhamalai Temple is a famous hill temple dedicated to Lord Murugan. Located on the Western Ghats at an altitude of about 500 meters, it offers breathtaking views of the surrounding landscape. The temple architecture showcases classic Dravidian style with intricate carvings and colorful sculptures.",
      activities: ["Worship", "Hiking", "Photography", "Meditation"],
      images: [marudhamalai],
      bestTime: "October to March",
      tips: "Visit early morning to avoid crowds and heat. Remember to remove footwear before entering the temple."
    },
    { 
      id: 2, 
      name: "Brookefields Mall", 
      category: "Shopping", 
      rating: 4.5,
      timing: "10 AM - 10 PM", 
      ticket: "Free", 
      location: "Brookefields, Coimbatore",
      description: "Brookefields Mall is one of the largest shopping malls in Coimbatore. It features a wide range of national and international brands, a food court with diverse cuisine options, a multiplex cinema, and entertainment zones for all ages.",
      activities: ["Shopping", "Dining", "Movies", "Gaming"],
      images: [brookefields],
      bestTime: "Weekdays to avoid crowds",
      tips: "Check for ongoing sales and promotions. The food court on the top floor has excellent options."
    },
    { 
      id: 3, 
      name: "Black Thunder", 
      category: "Amusement Park", 
      rating: 4.7,
      timing: "9 AM - 5 PM", 
      ticket: "₹750", 
      location: "Mettupalayam Road, 40 km from Coimbatore",
      description: "Black Thunder is a popular water theme park with thrilling rides, wave pools, and water slides. Set amidst the beautiful hills, it offers a perfect family getaway with various attractions for all age groups.",
      activities: ["Water Rides", "Swimming", "Adventure Activities", "Picnicking"],
      images: [blackthunder],
      bestTime: "Weekdays during summer",
      tips: "Carry swimwear, extra clothes, and sunscreen. Food is available inside but slightly expensive."
    },
    { 
      id: 4, 
      name: "Coimbatore Central Bus Stand", 
      category: "Transport", 
      rating: 4.3,
      timing: "24/7", 
      ticket: "Varies", 
      location: "Coimbatore Bus Stand",
      description: "Regular bus services connect Coimbatore to the beautiful hill station of Ooty. The journey takes you through scenic routes with hairpin bends and lush green forests, offering spectacular views of the Nilgiri mountains.",
      activities: ["Sightseeing", "Photography", "Hill Station Visit"],
      images: [BusStop],
      bestTime: "All year except monsoon season",
      tips: "Book tickets in advance during weekends and holidays. Early morning buses provide the best views."
    },
    { 
      id: 5, 
      name: "Dhyanalinga Temple", 
      category: "Tourist", 
      rating: 4.9,
      timing: "6 AM - 8 PM", 
      ticket: "Free", 
      location: "Isha Yoga Center, Coimbatore",
      description: "Dhyanalinga is a powerful and unique energy form created by Sadhguru Jaggi Vasudev. The temple is designed as a meditative space with perfect acoustics and energy. The linga is not associated with any particular faith and welcomes people from all religions.",
      activities: ["Meditation", "Yoga", "Spiritual Retreats", "Nature Walks"],
      images: [Dhyanalinga],
      bestTime: "Any time of year",
      tips: "Maintain silence inside the temple. Photography is not allowed inside the temple premises."
    },
    { 
      id: 6, 
      name: "Kovai Kondattam", 
      category: "Amusement Park", 
      rating: 4.4,
      timing: "10 AM - 7 PM", 
      ticket: "₹600", 
      location: "Perur, Coimbatore",
      description: "Kovai Kondattam is a popular amusement park featuring various rides, water activities, and entertainment options. It's an ideal destination for family outings and group picnics.",
      activities: ["Rides", "Water Games", "Live Shows", "Children's Play Areas"],
      images: [KovaiKondattam],
      bestTime: "October to February",
      tips: "Weekdays are less crowded. Carry extra clothes if you plan to enjoy water rides."
    },
    { 
      id: 7, 
      name: "Siruvani Waterfalls", 
      category: "Nature", 
      rating: 4.8,
      timing: "8 AM - 5 PM", 
      ticket: "₹50", 
      location: "Siruvani Hills, 37 km from Coimbatore",
      description: "Siruvani Waterfalls is known for its pristine water quality, considered among the tastiest water in the world. The waterfall is surrounded by dense forests and offers a refreshing retreat from city life.",
      activities: ["Swimming", "Trekking", "Bird Watching", "Photography"],
      images: [Siruvani],
      bestTime: "July to January",
      tips: "Permission required from Forest Department. Carry water and snacks as there are limited facilities."
    },
    { 
      id: 8, 
      name: "VOC Park and Zoo", 
      category: "Recreation", 
      rating: 4.2,
      timing: "9 AM - 6 PM", 
      ticket: "₹30", 
      location: "Coimbatore City",
      description: "V.O.C Park and Zoo is named after the freedom fighter V.O. Chidambaram. The park includes a small zoo, children's play area, and beautiful garden spaces, making it perfect for family outings.",
      activities: ["Zoo Visit", "Boating", "Children's Rides", "Picnicking"],
      images: [VOC],
      bestTime: "All year round",
      tips: "Visit on weekdays to avoid crowds. Early morning is the best time to see animals active."
    }
  ];
  