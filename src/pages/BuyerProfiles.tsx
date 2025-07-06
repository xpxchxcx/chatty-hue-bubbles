import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, Home, Users, TrendingDown, DollarSign, MapPin, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BuyerProfile {
  id: string;
  title: string;
  icon: any;
  description: string;
  color: string;
  bgColor: string;
  characteristics: string[];
  priorities: { name: string; weight: number }[];
  budget: { min: number; max: number };
  timeline: string;
  locations: string[];
  propertyTypes: string[];
  keyFeatures: string[];
  challenges: string[];
  successFactors: string[];
}

const buyerProfiles: BuyerProfile[] = [
  {
    id: "luxury",
    title: "Luxury Buyer",
    icon: Crown,
    description: "High-net-worth individuals seeking premium properties with exclusive amenities and prime locations.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200",
    characteristics: ["High income ($500K+)", "Quality over quantity", "Brand conscious", "Status-driven"],
    priorities: [
      { name: "Location Prestige", weight: 95 },
      { name: "Property Quality", weight: 90 },
      { name: "Unique Features", weight: 85 },
      { name: "Privacy", weight: 80 },
      { name: "Investment Potential", weight: 75 }
    ],
    budget: { min: 1000000, max: 5000000 },
    timeline: "6-18 months",
    locations: ["Downtown Austin", "Westlake", "Tarrytown", "Lake Austin"],
    propertyTypes: ["Luxury Condos", "Estate Homes", "Waterfront Properties"],
    keyFeatures: ["Concierge Services", "High-end Finishes", "Smart Home Tech", "Views", "Private Amenities"],
    challenges: ["Limited inventory", "High competition", "Complex financing"],
    successFactors: ["Exclusive access to listings", "White-glove service", "Market expertise"]
  },
  {
    id: "first-time",
    title: "First-Time Buyer",
    icon: Home,
    description: "Young professionals or couples purchasing their first home, focused on affordability and guidance.",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    characteristics: ["Age 25-35", "Learning the process", "Budget-conscious", "Future-focused"],
    priorities: [
      { name: "Affordability", weight: 95 },
      { name: "Good Schools", weight: 80 },
      { name: "Commute Access", weight: 75 },
      { name: "Starter Features", weight: 70 },
      { name: "Growth Potential", weight: 65 }
    ],
    budget: { min: 200000, max: 450000 },
    timeline: "3-12 months",
    locations: ["Cedar Park", "Round Rock", "Pflugerville", "Kyle"],
    propertyTypes: ["Condos", "Townhomes", "Small Single Family"],
    keyFeatures: ["Move-in Ready", "Low Maintenance", "Modern Updates", "Parking", "Safety"],
    challenges: ["Down payment", "Credit requirements", "Market knowledge", "Competition"],
    successFactors: ["Education & guidance", "Pre-approval assistance", "Patient approach"]
  },
  {
    id: "upsizing",
    title: "Upsizing Family",
    icon: Users,
    description: "Growing families needing more space, prioritizing schools, safety, and family-friendly neighborhoods.",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    characteristics: ["2+ children", "Outgrowing current home", "Established careers", "Community-focused"],
    priorities: [
      { name: "School Districts", weight: 90 },
      { name: "Space & Bedrooms", weight: 88 },
      { name: "Family Safety", weight: 85 },
      { name: "Neighborhood Amenities", weight: 75 },
      { name: "Yard Space", weight: 70 }
    ],
    budget: { min: 400000, max: 800000 },
    timeline: "6-12 months",
    locations: ["Leander", "Cedar Park", "Round Rock", "Lakeway"],
    propertyTypes: ["4+ Bedroom Homes", "Two-Story Homes", "Homes with Yards"],
    keyFeatures: ["Multiple Bedrooms", "Open Floor Plans", "Large Kitchen", "Backyard", "Garage"],
    challenges: ["Timing sale & purchase", "School district timing", "Space requirements"],
    successFactors: ["Contingent offers", "School calendar coordination", "Family needs focus"]
  },
  {
    id: "investor",
    title: "Price-Sensitive Investor",
    icon: TrendingDown,
    description: "Investment-focused buyers seeking properties with strong rental potential and appreciation upside.",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    characteristics: ["ROI-focused", "Market-savvy", "Multiple properties", "Data-driven"],
    priorities: [
      { name: "Cash Flow Potential", weight: 95 },
      { name: "Appreciation Potential", weight: 85 },
      { name: "Purchase Price", weight: 90 },
      { name: "Rental Demand", weight: 80 },
      { name: "Maintenance Costs", weight: 75 }
    ],
    budget: { min: 150000, max: 400000 },
    timeline: "1-6 months",
    locations: ["East Austin", "Del Valle", "Southeast Austin", "Emerging Neighborhoods"],
    propertyTypes: ["Condos", "Small Homes", "Fixer-Uppers", "Multi-Family"],
    keyFeatures: ["Below Market Price", "Rental Income Potential", "Appreciation Zones", "Low Maintenance"],
    challenges: ["Finding deals", "Financing multiple properties", "Property management"],
    successFactors: ["Market analysis", "Quick decisions", "Network of contractors", "Property management"]
  }
];

const BuyerProfiles = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")}
            className="mb-4"
          >
            ← Back to Profile
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Buyer Profile Simulation</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore how different buyer types approach the home search process. 
              Compare priorities, budgets, and strategies across various buyer personas.
            </p>
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {buyerProfiles.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedProfile === profile.id;
            
            return (
              <Card 
                key={profile.id} 
                className={`cursor-pointer transition-all hover:shadow-elevation ${
                  isSelected ? 'ring-2 ring-primary shadow-elevation' : ''
                } ${profile.bgColor}`}
                onClick={() => setSelectedProfile(isSelected ? null : profile.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center shadow-soft`}>
                    <Icon className={`w-6 h-6 ${profile.color}`} />
                  </div>
                  <CardTitle className="text-lg">{profile.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{profile.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Budget:</span>
                      <span>{formatPrice(profile.budget.min)} - {formatPrice(profile.budget.max)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Timeline:</span>
                      <span>{profile.timeline}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                  >
                    {isSelected ? "Hide Details" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Profile View */}
        {selectedProfile && (
          <div className="space-y-6">
            {buyerProfiles
              .filter(profile => profile.id === selectedProfile)
              .map((profile) => {
                const Icon = profile.icon;
                
                return (
                  <div key={profile.id} className="space-y-6">
                    {/* Profile Header */}
                    <Card className={profile.bgColor}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft">
                            <Icon className={`w-8 h-8 ${profile.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{profile.title}</CardTitle>
                            <p className="text-muted-foreground">{profile.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Characteristics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Key Characteristics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {profile.characteristics.map((char) => (
                              <Badge key={char} variant="outline" className="w-full justify-start">
                                {char}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Priorities */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            Priority Ranking
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {profile.priorities.map((priority) => (
                              <div key={priority.name}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{priority.name}</span>
                                  <span className="font-medium">{priority.weight}%</span>
                                </div>
                                <Progress value={priority.weight} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Budget & Timeline */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            Financial Profile
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <span className="text-sm font-medium">Budget Range</span>
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(profile.budget.min)} - {formatPrice(profile.budget.max)}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Typical Timeline</span>
                            <p className="text-muted-foreground">{profile.timeline}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Locations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Preferred Areas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {profile.locations.map((location) => (
                              <Badge key={location} variant="secondary">
                                {location}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Property Types */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Property Types
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {profile.propertyTypes.map((type) => (
                              <Badge key={type} variant="outline">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Features */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Must-Have Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {profile.keyFeatures.map((feature) => (
                              <Badge key={feature} variant="secondary" className="bg-green-100 text-green-800">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Challenges */}
                      <Card className="md:col-span-2 lg:col-span-1">
                        <CardHeader>
                          <CardTitle className="text-lg">Common Challenges</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {profile.challenges.map((challenge) => (
                              <li key={challenge} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Success Factors */}
                      <Card className="md:col-span-2 lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Success Factors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {profile.successFactors.map((factor) => (
                              <li key={factor} className="text-sm flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <Button onClick={() => navigate("/profile")} variant="outline">
            Compare to Your Profile
          </Button>
          <Button onClick={() => navigate("/swipe")} className="bg-gradient-primary">
            Find Properties for This Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfiles;