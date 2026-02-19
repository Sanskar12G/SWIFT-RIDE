import { motion } from "framer-motion";
import { Car, Shield, Zap, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Instant Matching",
    description: "AI-powered driver matching in under 30 seconds",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Real-time tracking and emergency SOS features",
  },
  {
    icon: Clock,
    title: "Schedule Rides",
    description: "Book now or schedule for any time",
  },
];

const stats = [
  { value: "2M+", label: "Rides Completed" },
  { value: "50K+", label: "Active Drivers" },
  { value: "4.9", label: "Average Rating" },
  { value: "100+", label: "Cities" },
];

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection = ({ onBookNow }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_8%)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_8%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-primary font-medium">AI-Powered Ride Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Urban Mobility
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Experience seamless rides with predictive AI, real-time tracking, and 
              unmatched safety features. Your journey, reimagined.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={onBookNow}>
                <MapPin className="w-5 h-5" />
                Book a Ride
              </Button>
              <Button variant="glass" size="xl">
                <Car className="w-5 h-5" />
                Become a Driver
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right content - Map preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-4 rounded-full border border-primary/20" />
              
              {/* Map simulation */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-muted to-card overflow-hidden border border-border">
                {/* Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_15%)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_15%)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                
                {/* Animated routes */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <motion.path
                    d="M40 160 Q100 80 160 40"
                    stroke="hsl(190 100% 50%)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <motion.path
                    d="M30 100 Q80 60 150 120"
                    stroke="hsl(260 60% 50%)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                </svg>
                
                {/* Animated car icons */}
                <motion.div
                  className="absolute w-4 h-4 text-primary"
                  animate={{
                    x: [60, 120, 180],
                    y: [180, 100, 40],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Car className="w-4 h-4 -rotate-45" />
                </motion.div>
                <motion.div
                  className="absolute w-4 h-4 text-secondary"
                  animate={{
                    x: [40, 90, 160],
                    y: [120, 70, 140],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Car className="w-4 h-4 rotate-12" />
                </motion.div>
                
                {/* Center pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-accent/20 animate-ping" />
                    <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <motion.div
                className="absolute -top-4 -right-4 p-4 rounded-xl bg-card/90 backdrop-blur-lg border border-border/50 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Top Rated</div>
                    <div className="text-xs text-muted-foreground">4.9 ★ (12k reviews)</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-card/90 backdrop-blur-lg border border-border/50 shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">ETA: 3 mins</div>
                    <div className="text-xs text-muted-foreground">Driver on the way</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(190_100%_50%/0.2)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
