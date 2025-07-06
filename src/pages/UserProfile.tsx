import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, MapPin, Home, DollarSign, Calendar, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock user profile data - in real app this would come from the chatbot conversation
const userProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  
  // Soft Filters
  softFilters: {
    style: ["Modern", "Contemporary"],
    preferences: ["Natural Light", "Open Floor Plan", "Updated Kitchen"],
    dislikes: ["Carpeted Floors", "Small Windows", "Outdated Bathrooms"]
  },
  
  // Hard Filters
  hardFilters: {
    priceRange: { min: 400000, max: 650000 },
    bedrooms: { min: 3, max: 4 },
    bathrooms: { min: 2, max: 3 },
    houseSize: { min: 1800, max: 2800 },
    lotSize: { min: 0.25, max: 1.0 },
    yearBuilt: { min: 2000, max: 2024 },
    strictPrice: true,
    strictBeds: false,
    strictSize: false
  },
  
  // Amenities
  amenities: {
    house: ["Garage", "Fireplace", "Hardwood Floors"],
    location: ["Good Schools", "Parks Nearby", "Shopping Centers"],
    features: ["Swimming Pool", "Garden", "Patio"]
  },
  
  // Location Preferences
  location: {
    preferred: ["West Austin", "Lakeway", "Cedar Park"],
    region: "Austin Metro Area"
  },
  
  // AI-derived insights
  buyerType: "Growing Family",
  urgency: "Medium",
  budget: "Moderate"
};

const UserProfile = () => {
  const navigate = useNavigate();

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Back to Chat
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <p className="text-muted-foreground">Based on your conversation with our AI concierge</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{userProfile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Buyer Type</p>
                  <Badge variant="secondary">{userProfile.buyerType}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgency Level</p>
                  <Badge variant="outline">{userProfile.urgency}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hard Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Hard Filters</CardTitle>
              <p className="text-sm text-muted-foreground">Non-negotiable requirements</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price Range
                  </span>
                  {userProfile.hardFilters.strictPrice && (
                    <Badge variant="destructive" className="text-xs">Strict</Badge>
                  )}
                </div>
                <p className="text-sm">
                  {formatPrice(userProfile.hardFilters.priceRange.min)} - {formatPrice(userProfile.hardFilters.priceRange.max)}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Bedrooms
                  </span>
                  {userProfile.hardFilters.strictBeds && (
                    <Badge variant="destructive" className="text-xs">Strict</Badge>
                  )}
                </div>
                <p className="text-sm">{userProfile.hardFilters.bedrooms.min} - {userProfile.hardFilters.bedrooms.max} bedrooms</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    House Size
                  </span>
                  {userProfile.hardFilters.strictSize && (
                    <Badge variant="destructive" className="text-xs">Strict</Badge>
                  )}
                </div>
                <p className="text-sm">{userProfile.hardFilters.houseSize.min.toLocaleString()} - {userProfile.hardFilters.houseSize.max.toLocaleString()} sqft</p>
              </div>

              <div>
                <span className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Year Built
                </span>
                <p className="text-sm">{userProfile.hardFilters.yearBuilt.min} - {userProfile.hardFilters.yearBuilt.max}</p>
              </div>
            </CardContent>
          </Card>

          {/* Soft Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Soft Filters</CardTitle>
              <p className="text-sm text-muted-foreground">Preferences and style</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium mb-2 block">Preferred Styles</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.softFilters.style.map((style) => (
                    <Badge key={style} variant="outline" className="text-blue-600 border-blue-200">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium mb-2 block">Likes</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.softFilters.preferences.map((pref) => (
                    <Badge key={pref} variant="secondary" className="bg-green-100 text-green-800">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium mb-2 block">Dislikes</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.softFilters.dislikes.map((dislike) => (
                    <Badge key={dislike} variant="secondary" className="bg-red-100 text-red-800">
                      {dislike}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600">
                <MapPin className="w-5 h-5" />
                Location Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium mb-2 block">Preferred Areas</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.location.preferred.map((area) => (
                    <Badge key={area} variant="outline" className="text-pink-600 border-pink-200">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium mb-2 block">Region</span>
                <p className="text-sm text-muted-foreground">{userProfile.location.region}</p>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium mb-2 block">House Features</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.amenities.house.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium mb-2 block">Location Features</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.amenities.location.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium mb-2 block">Special Features</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.amenities.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-purple-600">AI Taste Profile</CardTitle>
              <p className="text-sm text-muted-foreground">Machine learning insights from your preferences</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm font-medium mb-2 block">Style Match</span>
                  <Progress value={85} className="mb-2" />
                  <p className="text-xs text-muted-foreground">85% Contemporary/Modern preference</p>
                </div>
                <div>
                  <span className="text-sm font-medium mb-2 block">Location Fit</span>
                  <Progress value={92} className="mb-2" />
                  <p className="text-xs text-muted-foreground">92% Austin area alignment</p>
                </div>
                <div>
                  <span className="text-sm font-medium mb-2 block">Budget Realism</span>
                  <Progress value={78} className="mb-2" />
                  <p className="text-xs text-muted-foreground">78% market-realistic expectations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <Button onClick={() => navigate("/liked")} variant="outline">
            View Liked Properties
          </Button>
          <Button onClick={() => navigate("/swipe")} className="bg-gradient-primary">
            Continue Browsing
          </Button>
          <Button onClick={() => navigate("/profiles")} variant="secondary">
            Compare Buyer Profiles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;