import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createLead } from "@/services/notionLeadService";

const prestations = [
  { value: "video", label: "Vidéos d'entreprise" },
  { value: "ads", label: "Campagne Ads" },
  { value: "identity", label: "Identité visuelle" },
  { value: "social", label: "Social Media" },
  { value: "web", label: "Site Web" },
  { value: "other", label: "Autre" },
];

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    prestation: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      prestation: formData.prestation || undefined,
      message: formData.message || undefined,
      type: "Contact",
    });

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Message envoyé !",
        description: "Nous reviendrons vers vous très rapidement.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        prestation: "",
        message: "",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            CONTACT
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Prêt à donner vie
            <br />
            <span className="text-gradient">à votre projet ?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Parlez-nous de votre vision et laissez-nous vous accompagner dans 
            la réalisation de vos ambitions digitales.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-3xl p-8 space-y-6 shadow-card"
          >
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone & Prestation Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Prestation souhaitée</label>
                <Select
                  value={formData.prestation}
                  onValueChange={(value) => handleChange("prestation", value)}
                >
                  <SelectTrigger className="h-12 bg-secondary border-border focus:border-primary/50">
                    <SelectValue placeholder="Sélectionnez une prestation" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {prestations.map((prestation) => (
                      <SelectItem
                        key={prestation.value}
                        value={prestation.value}
                        className="focus:bg-primary/10"
                      >
                        {prestation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Votre message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                <Textarea
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="pl-11 min-h-[120px] bg-secondary border-border focus:border-primary/50 resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              variant="gradient"
              className="w-full h-12 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer le message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Info - Horizontal below form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-8 mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">contact@signela.fr</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="text-foreground font-medium">+33 1 23 45 67 89</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
