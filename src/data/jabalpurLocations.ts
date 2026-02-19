// Jabalpur, Madhya Pradesh - Popular locations with coordinates
export interface JabalpurLocation {
  name: string;
  area: string;
  lat: number;
  lng: number;
  fullAddress: string;
}

export const jabalpurLocations: JabalpurLocation[] = [
  // Major Areas
  { name: "Wright Town", area: "Central", lat: 23.1815, lng: 79.9864, fullAddress: "Wright Town, Jabalpur, MP" },
  { name: "Napier Town", area: "Central", lat: 23.1697, lng: 79.9335, fullAddress: "Napier Town, Jabalpur, MP" },
  { name: "Civil Lines", area: "Central", lat: 23.1645, lng: 79.9456, fullAddress: "Civil Lines, Jabalpur, MP" },
  { name: "Madan Mahal", area: "Central", lat: 23.1589, lng: 79.9178, fullAddress: "Madan Mahal, Jabalpur, MP" },
  { name: "Gorakhpur", area: "North", lat: 23.2012, lng: 79.9523, fullAddress: "Gorakhpur, Jabalpur, MP" },
  { name: "Adhartal", area: "North", lat: 23.2156, lng: 79.9234, fullAddress: "Adhartal, Jabalpur, MP" },
  { name: "Vijay Nagar", area: "East", lat: 23.1723, lng: 80.0123, fullAddress: "Vijay Nagar, Jabalpur, MP" },
  { name: "Gwarighat", area: "South", lat: 23.1234, lng: 79.8567, fullAddress: "Gwarighat, Jabalpur, MP" },
  
  // Railway Stations
  { name: "Jabalpur Junction", area: "Railway", lat: 23.1687, lng: 79.9501, fullAddress: "Jabalpur Junction Railway Station, MP" },
  { name: "Madan Mahal Railway Station", area: "Railway", lat: 23.1567, lng: 79.9123, fullAddress: "Madan Mahal Railway Station, Jabalpur, MP" },
  
  // Bus Stands
  { name: "Jabalpur Bus Stand", area: "Transport", lat: 23.1712, lng: 79.9534, fullAddress: "Main Bus Stand, Jabalpur, MP" },
  { name: "Katangi Bus Stand", area: "Transport", lat: 23.1823, lng: 79.9678, fullAddress: "Katangi Bus Stand, Jabalpur, MP" },
  
  // Markets & Shopping
  { name: "Sadar Bazaar", area: "Market", lat: 23.1678, lng: 79.9456, fullAddress: "Sadar Bazaar, Jabalpur, MP" },
  { name: "Gol Bazaar", area: "Market", lat: 23.1656, lng: 79.9389, fullAddress: "Gol Bazaar, Jabalpur, MP" },
  { name: "Kotwali Bazaar", area: "Market", lat: 23.1634, lng: 79.9412, fullAddress: "Kotwali Bazaar, Jabalpur, MP" },
  { name: "Omti Chowk", area: "Market", lat: 23.1598, lng: 79.9345, fullAddress: "Omti Chowk, Jabalpur, MP" },
  { name: "Sudama Chowk", area: "Market", lat: 23.1567, lng: 79.9298, fullAddress: "Sudama Chowk, Jabalpur, MP" },
  
  // Malls
  { name: "Malviya Chowk", area: "Commercial", lat: 23.1623, lng: 79.9378, fullAddress: "Malviya Chowk, Jabalpur, MP" },
  { name: "Samdariya Mall", area: "Mall", lat: 23.1789, lng: 79.9567, fullAddress: "Samdariya Mall, Wright Town, Jabalpur, MP" },
  { name: "South Avenue Mall", area: "Mall", lat: 23.1534, lng: 79.9234, fullAddress: "South Avenue Mall, Jabalpur, MP" },
  
  // Hospitals
  { name: "Medical College Hospital", area: "Healthcare", lat: 23.1756, lng: 79.9423, fullAddress: "NSCB Medical College, Jabalpur, MP" },
  { name: "Victoria Hospital", area: "Healthcare", lat: 23.1678, lng: 79.9389, fullAddress: "Victoria Hospital, Jabalpur, MP" },
  { name: "Marble City Hospital", area: "Healthcare", lat: 23.1612, lng: 79.9312, fullAddress: "Marble City Hospital, Jabalpur, MP" },
  { name: "Choithram Hospital", area: "Healthcare", lat: 23.1834, lng: 79.9523, fullAddress: "Choithram Hospital, Jabalpur, MP" },
  { name: "Life Line Hospital", area: "Healthcare", lat: 23.1745, lng: 79.9456, fullAddress: "Life Line Hospital, Jabalpur, MP" },
  
  // Educational Institutions
  { name: "Rani Durgavati University", area: "Education", lat: 23.1856, lng: 79.9756, fullAddress: "Rani Durgavati University, Jabalpur, MP" },
  { name: "IIITDM Jabalpur", area: "Education", lat: 23.1767, lng: 80.0234, fullAddress: "IIITDM, Dumna Airport Road, Jabalpur, MP" },
  { name: "Engineering College", area: "Education", lat: 23.1823, lng: 79.9634, fullAddress: "Jabalpur Engineering College, Jabalpur, MP" },
  { name: "Model School", area: "Education", lat: 23.1689, lng: 79.9423, fullAddress: "Model Higher Secondary School, Jabalpur, MP" },
  { name: "Christ Church School", area: "Education", lat: 23.1656, lng: 79.9378, fullAddress: "Christ Church School, Civil Lines, Jabalpur, MP" },
  
  // Tourist Places
  { name: "Bhedaghat", area: "Tourist", lat: 23.1089, lng: 79.8012, fullAddress: "Bhedaghat, Jabalpur, MP" },
  { name: "Marble Rocks", area: "Tourist", lat: 23.1123, lng: 79.7989, fullAddress: "Marble Rocks, Bhedaghat, Jabalpur, MP" },
  { name: "Dhuandhar Falls", area: "Tourist", lat: 23.1156, lng: 79.7934, fullAddress: "Dhuandhar Falls, Bhedaghat, Jabalpur, MP" },
  { name: "Balancing Rock", area: "Tourist", lat: 23.1567, lng: 79.9145, fullAddress: "Balancing Rock, Madan Mahal, Jabalpur, MP" },
  { name: "Madan Mahal Fort", area: "Tourist", lat: 23.1545, lng: 79.9167, fullAddress: "Madan Mahal Fort, Jabalpur, MP" },
  { name: "Tilwara Ghat", area: "Tourist", lat: 23.1456, lng: 79.9234, fullAddress: "Tilwara Ghat, Jabalpur, MP" },
  { name: "Rani Durgavati Museum", area: "Tourist", lat: 23.1634, lng: 79.9345, fullAddress: "Rani Durgavati Museum, Jabalpur, MP" },
  
  // Temples
  { name: "Pisanhari Ki Madhiya", area: "Temple", lat: 23.1234, lng: 79.9567, fullAddress: "Pisanhari Ki Madhiya, Jabalpur, MP" },
  { name: "Chausath Yogini Temple", area: "Temple", lat: 23.1078, lng: 79.8023, fullAddress: "Chausath Yogini Temple, Bhedaghat, Jabalpur, MP" },
  { name: "Tripur Sundari Temple", area: "Temple", lat: 23.1189, lng: 79.8956, fullAddress: "Tripur Sundari Temple, Jabalpur, MP" },
  { name: "Hanumantal", area: "Temple", lat: 23.1578, lng: 79.9289, fullAddress: "Hanumantal, Jabalpur, MP" },
  
  // Residential Areas
  { name: "Gyangunj", area: "Residential", lat: 23.1634, lng: 79.9234, fullAddress: "Gyangunj, Jabalpur, MP" },
  { name: "Khamaria", area: "Residential", lat: 23.1934, lng: 79.9789, fullAddress: "Khamaria, Jabalpur, MP" },
  { name: "Shakti Nagar", area: "Residential", lat: 23.1789, lng: 79.9567, fullAddress: "Shakti Nagar, Jabalpur, MP" },
  { name: "Ranjhi", area: "Residential", lat: 23.2089, lng: 79.9423, fullAddress: "Ranjhi, Jabalpur, MP" },
  { name: "Garha", area: "Residential", lat: 23.1456, lng: 79.9678, fullAddress: "Garha, Jabalpur, MP" },
  { name: "Tilhari", area: "Residential", lat: 23.1923, lng: 79.9345, fullAddress: "Tilhari, Jabalpur, MP" },
  { name: "Gohalpur", area: "Residential", lat: 23.1389, lng: 79.9123, fullAddress: "Gohalpur, Jabalpur, MP" },
  { name: "Cherital", area: "Residential", lat: 23.1345, lng: 79.9234, fullAddress: "Cherital, Jabalpur, MP" },
  { name: "Bargi", area: "Residential", lat: 23.0789, lng: 79.9456, fullAddress: "Bargi, Jabalpur, MP" },
  { name: "Rampur", area: "Residential", lat: 23.1567, lng: 79.8934, fullAddress: "Rampur, Jabalpur, MP" },
  { name: "Bilhari", area: "Residential", lat: 23.1289, lng: 79.8789, fullAddress: "Bilhari, Jabalpur, MP" },
  { name: "Katanga", area: "Residential", lat: 23.1823, lng: 79.9712, fullAddress: "Katanga, Jabalpur, MP" },
  { name: "Lamti", area: "Residential", lat: 23.1967, lng: 79.9567, fullAddress: "Lamti, Jabalpur, MP" },
  
  // Colonies
  { name: "Gupteshwar Colony", area: "Colony", lat: 23.1534, lng: 79.9178, fullAddress: "Gupteshwar Colony, Jabalpur, MP" },
  { name: "Nehru Nagar", area: "Colony", lat: 23.1678, lng: 79.9489, fullAddress: "Nehru Nagar, Jabalpur, MP" },
  { name: "South Civil Lines", area: "Colony", lat: 23.1589, lng: 79.9423, fullAddress: "South Civil Lines, Jabalpur, MP" },
  { name: "North Civil Lines", area: "Colony", lat: 23.1712, lng: 79.9478, fullAddress: "North Civil Lines, Jabalpur, MP" },
  { name: "Sanjeevani Nagar", area: "Colony", lat: 23.1845, lng: 79.9623, fullAddress: "Sanjeevani Nagar, Jabalpur, MP" },
  { name: "Madhav Nagar", area: "Colony", lat: 23.1756, lng: 79.9534, fullAddress: "Madhav Nagar, Jabalpur, MP" },
  { name: "Gora Bazar", area: "Colony", lat: 23.1623, lng: 79.9356, fullAddress: "Gora Bazar, Jabalpur, MP" },
  
  // Industrial Areas
  { name: "Richhai", area: "Industrial", lat: 23.2134, lng: 79.9345, fullAddress: "Richhai Industrial Area, Jabalpur, MP" },
  { name: "Ordnance Factory", area: "Industrial", lat: 23.1989, lng: 79.9234, fullAddress: "Ordnance Factory, Khamaria, Jabalpur, MP" },
  { name: "Gun Carriage Factory", area: "Industrial", lat: 23.1912, lng: 79.9189, fullAddress: "Gun Carriage Factory, Jabalpur, MP" },
  { name: "Vehicle Factory", area: "Industrial", lat: 23.1934, lng: 79.9212, fullAddress: "Vehicle Factory, Jabalpur, MP" },
  
  // Parks & Recreation
  { name: "Narmada Park", area: "Park", lat: 23.1634, lng: 79.9312, fullAddress: "Narmada Park, Jabalpur, MP" },
  { name: "Dumna Nature Reserve", area: "Park", lat: 23.1923, lng: 80.0345, fullAddress: "Dumna Nature Reserve, Jabalpur, MP" },
  { name: "Science Park", area: "Park", lat: 23.1756, lng: 79.9478, fullAddress: "Science Park, Jabalpur, MP" },
  
  // Airport
  { name: "Dumna Airport", area: "Airport", lat: 23.1778, lng: 80.0523, fullAddress: "Dumna Airport, Jabalpur, MP" },
  
  // Police Stations
  { name: "Kotwali Police Station", area: "Police", lat: 23.1645, lng: 79.9389, fullAddress: "Kotwali Police Station, Jabalpur, MP" },
  { name: "Civil Lines Police Station", area: "Police", lat: 23.1678, lng: 79.9445, fullAddress: "Civil Lines Police Station, Jabalpur, MP" },
  { name: "Gorakhpur Police Station", area: "Police", lat: 23.2034, lng: 79.9545, fullAddress: "Gorakhpur Police Station, Jabalpur, MP" },
  
  // Government Offices
  { name: "Collectorate", area: "Government", lat: 23.1656, lng: 79.9412, fullAddress: "District Collectorate, Jabalpur, MP" },
  { name: "High Court", area: "Government", lat: 23.1623, lng: 79.9378, fullAddress: "Madhya Pradesh High Court, Jabalpur, MP" },
  { name: "Municipal Corporation", area: "Government", lat: 23.1645, lng: 79.9423, fullAddress: "Municipal Corporation, Jabalpur, MP" },
  
  // Hotels
  { name: "Hotel Kalchuri Residency", area: "Hotel", lat: 23.1789, lng: 79.9534, fullAddress: "Hotel Kalchuri Residency, Jabalpur, MP" },
  { name: "Hotel Narmada Jacksons", area: "Hotel", lat: 23.1712, lng: 79.9489, fullAddress: "Hotel Narmada Jacksons, Jabalpur, MP" },
  { name: "Hotel Satya Ashoka", area: "Hotel", lat: 23.1678, lng: 79.9456, fullAddress: "Hotel Satya Ashoka, Jabalpur, MP" },
  
  // Additional Popular Areas
  { name: "Russel Chowk", area: "Commercial", lat: 23.1678, lng: 79.9423, fullAddress: "Russel Chowk, Jabalpur, MP" },
  { name: "Damoh Naka", area: "Commercial", lat: 23.1834, lng: 79.9612, fullAddress: "Damoh Naka, Jabalpur, MP" },
  { name: "Katni Naka", area: "Commercial", lat: 23.1912, lng: 79.9534, fullAddress: "Katni Naka, Jabalpur, MP" },
  { name: "Mandla Naka", area: "Commercial", lat: 23.1534, lng: 79.9123, fullAddress: "Mandla Naka, Jabalpur, MP" },
  { name: "Patan Naka", area: "Commercial", lat: 23.1389, lng: 79.9345, fullAddress: "Patan Naka, Jabalpur, MP" },
];

// Search function to filter locations based on input
export function searchJabalpurLocations(query: string): JabalpurLocation[] {
  if (!query || query.length < 1) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return jabalpurLocations
    .filter(location => 
      location.name.toLowerCase().includes(lowerQuery) ||
      location.area.toLowerCase().includes(lowerQuery) ||
      location.fullAddress.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 8); // Limit to 8 suggestions
}
