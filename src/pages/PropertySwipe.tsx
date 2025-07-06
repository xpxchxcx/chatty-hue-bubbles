import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart, X, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  images: string[];
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  features: string[];
  description: string;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop"],
    price: "$485,000",
    address: "123 Maple Street, Austin, TX",
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: "Single Family",
    features: ["Modern Kitchen", "Hardwood Floors", "Garden"],
    description: "Beautiful family home with updated finishes and spacious layout."
  },
  {
    id: "2", 
    images: ["https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=600&fit=crop"],
    price: "$325,000",
    address: "456 Oak Avenue, Dallas, TX",
    beds: 2,
    baths: 1,
    sqft: 1200,
    type: "Condo",
    features: ["City View", "Balcony", "Gym Access"],
    description: "Sleek downtown condo with stunning city views and modern amenities."
  },
  {
    id: "3",
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=600&fit=crop"],
    price: "$750,000",
    address: "789 Pine Road, Houston, TX",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Single Family",
    features: ["Pool", "Two-Car Garage", "Master Suite"],
    description: "Luxury home with resort-style backyard and premium finishes throughout."
  }
];

const FEEDBACK_OPTIONS = [
  { type: "like", options: ["Great Location", "Perfect Size", "Love the Kitchen", "Amazing Price", "Beautiful Design"] },
  { type: "dislike", options: ["Too Expensive", "Wrong Location", "Too Small", "Needs Updates", "No Parking"] }
];

const PropertySwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"like" | "dislike">("like");
  const [customFeedback, setCustomFeedback] = useState("");
  const { toast } = useToast();

  const currentProperty = MOCK_PROPERTIES[currentIndex];

  const handleSwipe = (direction: "like" | "dislike") => {
    setFeedbackType(direction);
    setShowFeedback(true);
  };

  const submitFeedback = (reason?: string) => {
    const feedbackText = reason || customFeedback;
    
    toast({
      title: feedbackType === "like" ? "Property Liked!" : "Property Passed",
      description: feedbackText ? `Reason: ${feedbackText}` : "Thanks for your feedback!",
    });

    // Move to next property
    if (currentIndex < MOCK_PROPERTIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start for demo
    }
    
    setShowFeedback(false);
    setCustomFeedback("");
  };

  if (!currentProperty) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No more properties!</h2>
          <p className="text-muted-foreground">Check back later for new listings.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Find Your Perfect Home
          </h1>
          <p className="text-muted-foreground">Swipe through properties you'll love</p>
        </div>

        {/* Property Card */}
        <Card className="overflow-hidden shadow-elevation mb-6">
          <div className="relative">
            <img 
              src={currentProperty.images[0]} 
              alt={currentProperty.address}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 text-primary font-semibold">
                {currentProperty.price}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{currentProperty.type}</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentProperty.address}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-primary" />
                <span className="text-sm">{currentProperty.beds} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-primary" />
                <span className="text-sm">{currentProperty.baths} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4 text-primary" />
                <span className="text-sm">{currentProperty.sqft} sqft</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {currentProperty.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {currentProperty.features.map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
            onClick={() => handleSwipe("dislike")}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90"
            onClick={() => handleSwipe("like")}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          Property {currentIndex + 1} of {MOCK_PROPERTIES.length}
        </div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {feedbackType === "like" ? "What did you love?" : "What wasn't right?"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {FEEDBACK_OPTIONS.find(f => f.type === feedbackType)?.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => submitFeedback(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Or tell us more:</label>
              <Textarea
                placeholder="Share your thoughts..."
                value={customFeedback}
                onChange={(e) => setCustomFeedback(e.target.value)}
                className="min-h-[80px]"
              />
              <Button 
                onClick={() => submitFeedback()}
                disabled={!customFeedback.trim()}
                className="w-full"
              >
                Submit Feedback
              </Button>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => submitFeedback()}
              className="w-full"
            >
              Skip for now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertySwipe;