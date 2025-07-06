import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Phone, Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock liked properties data
const likedProperties = [
  {
    id: "1",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"],
    price: "$485,000",
    address: "123 Maple Street, Austin, TX",
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: "Single Family",
    features: ["Modern Kitchen", "Hardwood Floors", "Garden"],
    description: "Beautiful family home with updated finishes and spacious layout.",
    likedReason: "Perfect Size",
    likedDate: "2024-01-15"
  },
  {
    id: "2",
    images: ["https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop"],
    price: "$625,000", 
    address: "789 Oak Lane, Cedar Park, TX",
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: "Single Family",
    features: ["Pool", "Two-Car Garage", "Master Suite"],
    description: "Stunning home with resort-style backyard and premium finishes.",
    likedReason: "Amazing Price",
    likedDate: "2024-01-14"
  },
  {
    id: "3",
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop"],
    price: "$550,000",
    address: "456 Pine Avenue, Lakeway, TX", 
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "Single Family",
    features: ["Lake View", "Fireplace", "Deck"],
    description: "Charming home with beautiful lake views and peaceful setting.",
    likedReason: "Great Location",
    likedDate: "2024-01-13"
  }
];

const LikedProperties = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleContactAgent = (propertyId: string) => {
    // In a real app, this would connect to agent contact system
    alert(`Connecting you with an agent for property ${propertyId}...`);
  };

  const handleScheduleViewing = (propertyId: string) => {
    // In a real app, this would open scheduling system
    alert(`Opening calendar to schedule viewing for property ${propertyId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")}
            className="mb-4"
          >
            ← Back to Profile
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
                Your Liked Properties
              </h1>
              <p className="text-muted-foreground mt-2">
                {likedProperties.length} properties you've shown interest in
              </p>
            </div>
            <Button onClick={() => navigate("/swipe")} className="bg-gradient-primary">
              Find More Properties
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        {likedProperties.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No liked properties yet</h2>
            <p className="text-muted-foreground mb-6">
              Start swiping to find properties you love!
            </p>
            <Button onClick={() => navigate("/swipe")} className="bg-gradient-primary">
              Browse Properties
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {likedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden shadow-soft hover:shadow-elevation transition-shadow">
                <div className="relative">
                  <img 
                    src={property.images[0]} 
                    alt={property.address}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-primary font-semibold">
                      {property.price}
                    </Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">
                      <Heart className="w-3 h-3 mr-1 fill-current" />
                      {property.likedReason}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg">{property.type}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-primary" />
                      <span>{property.beds} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-primary" />
                      <span>{property.baths} baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4 text-primary" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Liked {formatDate(property.likedDate)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleContactAgent(property.id)}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Contact Agent
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-primary"
                      onClick={() => handleScheduleViewing(property.id)}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {likedProperties.length > 0 && (
          <Card className="mt-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Your Preferences Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Average Price Range:</span>
                <p className="text-muted-foreground">$485K - $625K</p>
              </div>
              <div>
                <span className="font-medium">Preferred Size:</span>
                <p className="text-muted-foreground">1,850 - 2,400 sqft</p>
              </div>
              <div>
                <span className="font-medium">Top Reasons for Liking:</span>
                <p className="text-muted-foreground">Great Location, Perfect Size</p>
              </div>
            </div>
            <Button className="mt-4 w-full md:w-auto" onClick={() => navigate("/profile")}>
              View Full Profile & Preferences
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LikedProperties;