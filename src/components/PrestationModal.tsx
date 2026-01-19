import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createLead } from "@/services/notionLeadService";

interface PrestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prestation: {
    id: string;
    label: string;
    title: string;
  } | null;
}

const budgetOptions = [
  "Moins de 1 000€",
  "1 000€ - 3 000€",
  "3 000€ - 5 000€",
  "5 000€ - 10 000€",
  "Plus de 10 000€",
];

export const PrestationModal = ({ isOpen, onClose, prestation }: PrestationModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    instagram: "",
    googleBusiness: "",
    website: "",
    linkedin: "",
    tiktok: "",
    message: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      instagram: "",
      googleBusiness: "",
      website: "",
      linkedin: "",
      tiktok: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      prestation: prestation?.id,
      budget: formData.budget || undefined,
      message: formData.message || undefined,
      instagram: formData.instagram || undefined,
      tiktok: formData.tiktok || undefined,
      linkedin: formData.linkedin || undefined,
      website: formData.website || undefined,
      googleBusiness: formData.googleBusiness || undefined,
      type: "Demande devis",
    });

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Demande envoyée !",
        description: "Nous reviendrons vers vous très rapidement avec un devis personnalisé.",
      });
      resetForm();
      onClose();
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (!prestation) return null;

  const renderSpecificFields = () => {
    switch (prestation.id) {
      case "video":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="website">Site web actuel (optionnel)</Label>
              <Input
                id="website"
                placeholder="https://votresite.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Décrivez votre projet vidéo</Label>
              <Textarea
                id="message"
                placeholder="Type de vidéo souhaitée, durée estimée, objectif..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          </>
        );

      case "ads":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Compte Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="@votrecompte"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleBusiness">Fiche Google Business (URL)</Label>
                <Input
                  id="googleBusiness"
                  type="url"
                  placeholder="https://g.co/kgs/votre-fiche"
                  value={formData.googleBusiness}
                  onChange={(e) => setFormData({ ...formData, googleBusiness: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tiktok">Compte TikTok (optionnel)</Label>
                <Input
                  id="tiktok"
                  placeholder="@votrecompte"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">Page LinkedIn (optionnel)</Label>
                <Input
                  id="linkedin"
                  placeholder="URL de votre page"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>
            </div>
          </>
        );

      case "identity":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="website">Site web actuel (optionnel)</Label>
              <Input
                id="website"
                placeholder="https://votresite.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Décrivez votre vision</Label>
              <Textarea
                id="message"
                placeholder="Vos valeurs, votre positionnement, vos inspirations..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          </>
        );

      case "social":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Compte Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="@votrecompte"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok">Compte TikTok</Label>
                <Input
                  id="tiktok"
                  placeholder="@votrecompte"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">Page LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="URL de votre page"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleBusiness">Fiche Google Business (URL)</Label>
                <Input
                  id="googleBusiness"
                  type="url"
                  placeholder="https://g.co/kgs/votre-fiche"
                  value={formData.googleBusiness}
                  onChange={(e) => setFormData({ ...formData, googleBusiness: e.target.value })}
                />
              </div>
            </div>
          </>
        );

      case "web":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="website">Site web actuel (si refonte)</Label>
              <Input
                id="website"
                placeholder="https://votresite.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Décrivez votre projet web</Label>
              <Textarea
                id="message"
                placeholder="Type de site, fonctionnalités souhaitées, références..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">{prestation.label}</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour nous donner plus d'informations sur votre projet.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Common fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget estimé *</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                required
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Sélectionnez un budget" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {budgetOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specific fields based on prestation */}
          {renderSpecificFields()}

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-primary-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
