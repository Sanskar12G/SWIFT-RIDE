import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from './ui/card';
import { MapPin, Navigation, Clock, IndianRupee, Star, Users, X, Car } from 'lucide-react';
import { Button } from './ui/button';
import { generateNearbyCars, carCategoryIcons, NearbyCarInfo, JABALPUR_CENTER } from '@/data/nearbyCars';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface IndiaMapProps {
  pickup?: Location | null;
  dropoff?: Location | null;
  onPickupChange?: (location: Location | null) => void;
  onDropoffChange?: (location: Location | null) => void;
  onRouteCalculated?: (distance: number, duration: number, fare: number) => void;
  selectMode?: 'pickup' | 'dropoff' | null;
}

// Custom marker icons
const pickupIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background: linear-gradient(135deg, #10b981, #059669); width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const dropoffIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Create car icon based on category
const createCarIcon = (category: keyof typeof carCategoryIcons) => {
  const iconData = carCategoryIcons[category];
  return new L.DivIcon({
    className: 'car-marker',
    html: `<div style="background: ${iconData.color}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: transform 0.2s;">
      ${iconData.svg}
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// Fare calculation rates (per km in INR)
const FARE_RATES = {
  baseFare: 25,
  perKm: 12,
  perMinute: 1.5,
  surgeFactor: 1.0,
};

const IndiaMap = ({ 
  pickup, 
  dropoff, 
  onPickupChange, 
  onDropoffChange, 
  onRouteCalculated,
  selectMode 
}: IndiaMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const pickupMarker = useRef<L.Marker | null>(null);
  const dropoffMarker = useRef<L.Marker | null>(null);
  const routeLine = useRef<L.Polyline | null>(null);
  const glowLine = useRef<L.Polyline | null>(null);
  const carMarkers = useRef<L.Marker[]>([]);
  
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
    fare: number;
  } | null>(null);
  
  const [nearbyCars, setNearbyCars] = useState<NearbyCarInfo[]>([]);
  const [selectedCar, setSelectedCar] = useState<NearbyCarInfo | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Jabalpur
    map.current = L.map(mapContainer.current, {
      zoomControl: false,
    }).setView([JABALPUR_CENTER.lat, JABALPUR_CENTER.lng], 13);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    // Custom dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map.current);

    // Add click handler for location selection
    map.current.on('click', async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Reverse geocode to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        const location = { lat, lng, address };
        
        if (selectMode === 'pickup' && onPickupChange) {
          onPickupChange(location);
        } else if (selectMode === 'dropoff' && onDropoffChange) {
          onDropoffChange(location);
        }
      } catch (error) {
        const location = { lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` };
        if (selectMode === 'pickup' && onPickupChange) {
          onPickupChange(location);
        } else if (selectMode === 'dropoff' && onDropoffChange) {
          onDropoffChange(location);
        }
      }
    });

    // Generate initial cars around Jabalpur center
    const cars = generateNearbyCars(JABALPUR_CENTER.lat, JABALPUR_CENTER.lng);
    setNearbyCars(cars);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add car markers to map
  useEffect(() => {
    if (!map.current) return;

    // Remove existing car markers
    carMarkers.current.forEach(marker => marker.remove());
    carMarkers.current = [];

    // Add car markers
    nearbyCars.forEach(car => {
      const icon = createCarIcon(car.category);
      const marker = L.marker([car.lat, car.lng], { icon })
        .addTo(map.current!);
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedCar(car);
      });
      
      carMarkers.current.push(marker);
    });
  }, [nearbyCars]);

  // Update cars when pickup location changes
  useEffect(() => {
    if (pickup) {
      const cars = generateNearbyCars(pickup.lat, pickup.lng);
      setNearbyCars(cars);
    }
  }, [pickup]);

  // Update pickup marker
  useEffect(() => {
    if (!map.current) return;

    if (pickupMarker.current) {
      pickupMarker.current.remove();
      pickupMarker.current = null;
    }

    if (pickup) {
      pickupMarker.current = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon })
        .addTo(map.current)
        .bindPopup(`<strong>Pickup</strong><br/>${pickup.address}`);
      
      map.current.setView([pickup.lat, pickup.lng], 14);
    }
  }, [pickup]);

  // Update dropoff marker
  useEffect(() => {
    if (!map.current) return;

    if (dropoffMarker.current) {
      dropoffMarker.current.remove();
      dropoffMarker.current = null;
    }

    if (dropoff) {
      dropoffMarker.current = L.marker([dropoff.lat, dropoff.lng], { icon: dropoffIcon })
        .addTo(map.current)
        .bindPopup(`<strong>Dropoff</strong><br/>${dropoff.address}`);
    }
  }, [dropoff]);

  // Calculate and draw route
  useEffect(() => {
    if (!map.current || !pickup || !dropoff) {
      if (routeLine.current) {
        routeLine.current.remove();
        routeLine.current = null;
      }
      if (glowLine.current) {
        glowLine.current.remove();
        glowLine.current = null;
      }
      setRouteInfo(null);
      return;
    }

    const calculateRoute = async () => {
      try {
        // Use OSRM for routing
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          
          // Remove existing routes
          if (routeLine.current) routeLine.current.remove();
          if (glowLine.current) glowLine.current.remove();

          // Add glow effect first (behind main line)
          glowLine.current = L.polyline(coordinates, {
            color: '#00e5ff',
            weight: 12,
            opacity: 0.3,
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(map.current!);

          // Draw main route line
          routeLine.current = L.polyline(coordinates, {
            color: '#00e5ff',
            weight: 5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(map.current!);

          // Fit bounds to show entire route
          map.current!.fitBounds(routeLine.current.getBounds(), { padding: [50, 50] });

          // Calculate fare
          const distanceKm = route.distance / 1000;
          const durationMin = route.duration / 60;
          const fare = Math.round(
            FARE_RATES.baseFare + 
            (distanceKm * FARE_RATES.perKm) + 
            (durationMin * FARE_RATES.perMinute) * 
            FARE_RATES.surgeFactor
          );

          const info = {
            distance: Math.round(distanceKm * 10) / 10,
            duration: Math.round(durationMin),
            fare
          };
          
          setRouteInfo(info);
          onRouteCalculated?.(info.distance, info.duration, info.fare);
        }
      } catch (error) {
        console.error('Error calculating route:', error);
        // Fallback: straight line calculation
        const R = 6371;
        const dLat = (dropoff.lat - pickup.lat) * Math.PI / 180;
        const dLon = (dropoff.lng - pickup.lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(pickup.lat * Math.PI / 180) * Math.cos(dropoff.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distanceKm = R * c * 1.3;
        const durationMin = distanceKm * 2.5;
        const fare = Math.round(
          FARE_RATES.baseFare + 
          (distanceKm * FARE_RATES.perKm) + 
          (durationMin * FARE_RATES.perMinute)
        );

        if (routeLine.current) routeLine.current.remove();
        if (glowLine.current) glowLine.current.remove();
        
        routeLine.current = L.polyline(
          [[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]],
          { color: '#00e5ff', weight: 4, opacity: 0.8, dashArray: '10, 10' }
        ).addTo(map.current!);

        const info = {
          distance: Math.round(distanceKm * 10) / 10,
          duration: Math.round(durationMin),
          fare
        };
        setRouteInfo(info);
        onRouteCalculated?.(info.distance, info.duration, info.fare);
      }
    };

    calculateRoute();
  }, [pickup, dropoff, onRouteCalculated]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-xl overflow-hidden" />
      
      {/* Car Category Legend */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-3 z-[1000]">
        <p className="text-xs font-medium text-muted-foreground mb-2">Car Types</p>
        <div className="space-y-1.5">
          {Object.entries(carCategoryIcons).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: value.color }}
                dangerouslySetInnerHTML={{ __html: value.svg.replace('width="18"', 'width="12"').replace('height="18"', 'height="12"') }}
              />
              <span className="text-xs">{value.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Route Info Overlay */}
      {routeInfo && (
        <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card/95 backdrop-blur-xl border-primary/30 p-4 z-[1000]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                <Navigation className="w-4 h-4" />
                <span>Distance</span>
              </div>
              <p className="text-xl font-bold text-primary">{routeInfo.distance} km</p>
            </div>
            <div className="text-center border-x border-border">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </div>
              <p className="text-xl font-bold text-foreground">{routeInfo.duration} min</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                <IndianRupee className="w-4 h-4" />
                <span>Fare</span>
              </div>
              <p className="text-xl font-bold text-accent">₹{routeInfo.fare}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Selection mode indicator */}
      {selectMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-xl border border-primary/30 px-4 py-2 rounded-full z-[1000]">
          <div className="flex items-center gap-2">
            <MapPin className={`w-5 h-5 ${selectMode === 'pickup' ? 'text-green-500' : 'text-red-500'}`} />
            <span className="text-sm font-medium">
              Click on map to set {selectMode} location
            </span>
          </div>
        </div>
      )}

      {/* Selected Car Details Modal */}
      {selectedCar && (
        <div className="absolute inset-0 flex items-center justify-center z-[1001]" onClick={() => setSelectedCar(null)}>
          <Card 
            className="w-[320px] bg-card/98 backdrop-blur-xl border-primary/30 p-0 overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Car Image */}
            <div className="relative h-40 overflow-hidden">
              <img 
                src={selectedCar.photo} 
                alt={selectedCar.carModel}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1"
                style={{ backgroundColor: carCategoryIcons[selectedCar.category].color }}
              >
                <span dangerouslySetInnerHTML={{ __html: carCategoryIcons[selectedCar.category].svg.replace('width="18"', 'width="12"').replace('height="18"', 'height="12"') }} />
                {carCategoryIcons[selectedCar.category].label}
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-8 h-8"
                onClick={() => setSelectedCar(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Car Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{selectedCar.carModel}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCar.carNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">ETA</p>
                  <p className="font-bold text-primary">{selectedCar.eta} min</p>
                </div>
              </div>
              
              {/* Driver Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedCar.driverName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{selectedCar.driverRating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{selectedCar.seatingCapacity}</span>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCar.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Color</p>
                  <p className="font-medium">{selectedCar.color}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Price Factor</p>
                  <p className="font-bold text-accent">{selectedCar.priceMultiplier}x</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Map style overlay for futuristic effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-background/10 rounded-xl" />
    </div>
  );
};

export default IndiaMap;
