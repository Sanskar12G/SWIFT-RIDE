import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Car, Zap, Crown, Leaf, Calendar, IndianRupee, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useMemo, useRef, useEffect } from "react";
import IndiaMap from "./IndiaMap";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { searchJabalpurLocations, JabalpurLocation } from "@/data/jabalpurLocations";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const rideOptions = [
  {
    id: "economy",
    name: "Economy",
    icon: Car,
    basePrice: 25,
    perKm: 12,
    time: "3 min",
    description: "Affordable everyday rides",
    multiplier: 1,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: Crown,
    basePrice: 50,
    perKm: 25,
    time: "5 min",
    description: "Premium comfort experience",
    multiplier: 2.2,
  },
  {
    id: "ev",
    name: "Electric",
    icon: Leaf,
    basePrice: 30,
    perKm: 14,
    time: "4 min",
    description: "Eco-friendly rides",
    multiplier: 1.2,
  },
];

interface BookingPanelProps {
  onBack: () => void;
}

const BookingPanel = ({ onBack }: BookingPanelProps) => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [pickupText, setPickupText] = useState("");
  const [dropoffText, setDropoffText] = useState("");
  const [selectedRide, setSelectedRide] = useState("economy");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectMode, setSelectMode] = useState<'pickup' | 'dropoff' | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number; fare: number } | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter suggestions based on input
  const pickupSuggestions = useMemo(() => searchJabalpurLocations(pickupText), [pickupText]);
  const dropoffSuggestions = useMemo(() => searchJabalpurLocations(dropoffText), [dropoffText]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPickupSuggestion = (location: JabalpurLocation) => {
    setPickupText(location.fullAddress);
    setPickup({ lat: location.lat, lng: location.lng, address: location.fullAddress });
    setShowPickupSuggestions(false);
  };

  const handleSelectDropoffSuggestion = (location: JabalpurLocation) => {
    setDropoffText(location.fullAddress);
    setDropoff({ lat: location.lat, lng: location.lng, address: location.fullAddress });
    setShowDropoffSuggestions(false);
  };

  const handlePickupChange = (location: Location | null) => {
    setPickup(location);
    if (location) {
      setPickupText(location.address);
    }
    setSelectMode(null);
  };

  const handleDropoffChange = (location: Location | null) => {
    setDropoff(location);
    if (location) {
      setDropoffText(location.address);
    }
    setSelectMode(null);
  };

  const handleRouteCalculated = (distance: number, duration: number, fare: number) => {
    const selectedOption = rideOptions.find(r => r.id === selectedRide);
    const adjustedFare = Math.round(fare * (selectedOption?.multiplier || 1));
    setRouteInfo({ distance, duration, fare: adjustedFare });
  };

  const calculateFare = () => {
    if (!routeInfo) return null;
    const selectedOption = rideOptions.find(r => r.id === selectedRide);
    return Math.round(routeInfo.fare * (selectedOption?.multiplier || 1));
  };

  const handleConfirmRide = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book a ride.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!pickup || !dropoff) {
      toast({
        title: "Missing Locations",
        description: "Please select pickup and dropoff locations.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    try {
      const fare = calculateFare();
      const { error } = await supabase.from('trips').insert({
        rider_id: user.id,
        pickup_address: pickup.address,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        dropoff_address: dropoff.address,
        dropoff_lat: dropoff.lat,
        dropoff_lng: dropoff.lng,
        distance_km: routeInfo?.distance,
        fare: fare,
        ride_type: selectedRide,
        status: 'pending',
        scheduled_at: isScheduled && scheduleTime ? new Date(scheduleTime).toISOString() : null,
      });

      if (error) throw error;

      toast({
        title: "Ride Booked!",
        description: `Your ${selectedRide} ride has been confirmed. Fare: ₹${fare}`,
      });

      // Reset form
      setPickup(null);
      setDropoff(null);
      setPickupText("");
      setDropoffText("");
      setRouteInfo(null);
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book ride. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section className="min-h-screen py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_8%)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_8%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" className="mb-6" onClick={onBack}>
              ← Back to Home
            </Button>
            
            <Card variant="glass" className="p-6">
              <h2 className="text-2xl font-bold mb-6">Book Your Ride</h2>
              
              {/* Location inputs */}
              <div className="space-y-4 mb-6 relative">
                {/* Pickup input with autocomplete */}
                <div className="relative" ref={pickupRef}>
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 z-10" />
                  <Input
                    placeholder="Search pickup in Jabalpur..."
                    value={pickupText}
                    onChange={(e) => {
                      setPickupText(e.target.value);
                      setShowPickupSuggestions(true);
                    }}
                    onFocus={() => setShowPickupSuggestions(true)}
                    className="pl-12 pr-24"
                  />
                  <Button
                    variant={selectMode === 'pickup' ? 'default' : 'ghost'}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                    onClick={() => setSelectMode(selectMode === 'pickup' ? null : 'pickup')}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectMode === 'pickup' ? 'Selecting...' : 'Map'}
                  </Button>
                  
                  {/* Pickup suggestions dropdown */}
                  <AnimatePresence>
                    {showPickupSuggestions && pickupSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                      >
                        {pickupSuggestions.map((location, index) => (
                          <button
                            key={`${location.name}-${index}`}
                            className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-start gap-3 border-b border-border/50 last:border-0 transition-colors"
                            onClick={() => handleSelectPickupSuggestion(location)}
                          >
                            <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm">{location.name}</p>
                              <p className="text-xs text-muted-foreground">{location.area} • {location.fullAddress}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Dropoff input with autocomplete */}
                <div className="relative" ref={dropoffRef}>
                  <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 z-10" />
                  <Input
                    placeholder="Search destination in Jabalpur..."
                    value={dropoffText}
                    onChange={(e) => {
                      setDropoffText(e.target.value);
                      setShowDropoffSuggestions(true);
                    }}
                    onFocus={() => setShowDropoffSuggestions(true)}
                    className="pl-12 pr-24"
                  />
                  <Button
                    variant={selectMode === 'dropoff' ? 'default' : 'ghost'}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                    onClick={() => setSelectMode(selectMode === 'dropoff' ? null : 'dropoff')}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    {selectMode === 'dropoff' ? 'Selecting...' : 'Map'}
                  </Button>
                  
                  {/* Dropoff suggestions dropdown */}
                  <AnimatePresence>
                    {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                      >
                        {dropoffSuggestions.map((location, index) => (
                          <button
                            key={`${location.name}-${index}`}
                            className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-start gap-3 border-b border-border/50 last:border-0 transition-colors"
                            onClick={() => handleSelectDropoffSuggestion(location)}
                          >
                            <Navigation className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm">{location.name}</p>
                              <p className="text-xs text-muted-foreground">{location.area} • {location.fullAddress}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Connecting line */}
                <div className="absolute left-[2.15rem] top-[1.5rem] w-0.5 h-8 bg-gradient-to-b from-green-500 to-red-500" />
              </div>
              
              {/* Schedule toggle */}
              <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-muted/50">
                <Button
                  variant={!isScheduled ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsScheduled(false)}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Ride Now
                </Button>
                <Button
                  variant={isScheduled ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsScheduled(true)}
                  className="flex-1"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
              
              {isScheduled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <Input 
                    type="datetime-local" 
                    className="w-full" 
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </motion.div>
              )}
              
              {/* Ride options */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-medium text-muted-foreground">Select Ride Type</h3>
                {rideOptions.map((option) => {
                  const optionFare = routeInfo 
                    ? Math.round(routeInfo.fare * option.multiplier / rideOptions.find(r => r.id === selectedRide)!.multiplier)
                    : null;
                  
                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        variant={selectedRide === option.id ? "glow" : "default"}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedRide === option.id ? "border-primary" : ""
                        }`}
                        onClick={() => setSelectedRide(option.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedRide === option.id ? "bg-primary/20" : "bg-muted"
                          }`}>
                            <option.icon className={`w-6 h-6 ${
                              selectedRide === option.id ? "text-primary" : "text-muted-foreground"
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{option.name}</span>
                              <span className="font-bold text-primary flex items-center">
                                <IndianRupee className="w-4 h-4" />
                                {optionFare || `${option.basePrice}+`}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{option.description}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {option.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Route summary */}
              {routeInfo && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-bold">{routeInfo.distance} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-bold">{routeInfo.duration} min</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fare</p>
                      <p className="font-bold text-accent flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {calculateFare()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                variant="hero" 
                size="xl" 
                className="w-full"
                onClick={handleConfirmRide}
                disabled={!pickup || !dropoff || isBooking}
              >
                {isBooking ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm Ride
                    {calculateFare() && <span className="ml-2">• ₹{calculateFare()}</span>}
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24 h-[600px] rounded-xl overflow-hidden border border-border/50"
          >
            <IndiaMap
              pickup={pickup}
              dropoff={dropoff}
              onPickupChange={handlePickupChange}
              onDropoffChange={handleDropoffChange}
              onRouteCalculated={handleRouteCalculated}
              selectMode={selectMode}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingPanel;