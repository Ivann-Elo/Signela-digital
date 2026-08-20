import { useId, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/services/leadService";
import { SERVICE_OPTIONS, type ServiceOption } from "@/types/lead";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  nom?: string;
  email?: string;
  consentement?: string;
}

interface LeadFormState {
  nom: string;
  email: string;
  telephone: string;
  message: string;
  service: ServiceOption;
  consentement: boolean;
  /** Honeypot value — must stay empty; a filled value flags a bot. */
  company: string;
}

export interface LeadFormProps {
  /** Where the lead came from (e.g. "Page Vidéo", "Modale Media Buying"). Traced through to Make. */
  source: string;
  /** Pre-selects the "Service" field for this page's context. */
  defaultService?: ServiceOption;
  className?: string;
  /** Called after a successful submission (e.g. to close a modal). */
  onSuccess?: () => void;
}

const getInitialState = (defaultService: ServiceOption): LeadFormState => ({
  nom: "",
  email: "",
  telephone: "",
  message: "",
  service: defaultService,
  consentement: false,
  company: "",
});

export const LeadForm = ({ source, defaultService = "autre", className, onSuccess }: LeadFormProps) => {
  const { toast } = useToast();
  const uid = useId();
  const nomRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<LeadFormState>(() => getInitialState(defaultService));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = <K extends keyof LeadFormState>(field: K, value: LeadFormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: FieldErrors = {};
    const nom = formData.nom.trim();
    const email = formData.email.trim();

    if (!nom) {
      errors.nom = "Le nom est requis.";
    }
    if (!email) {
      errors.email = "L'email est requis.";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Format d'email invalide.";
    }
    if (!formData.consentement) {
      errors.consentement = "Le consentement est requis pour être recontacté(e).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError(null);
      setStatus("error");
      if (errors.nom) {
        nomRef.current?.focus();
      } else if (errors.email) {
        emailRef.current?.focus();
      } else {
        consentRef.current?.focus();
      }
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    setStatus("loading");

    const result = await submitLead({
      nom,
      email,
      telephone: formData.telephone.trim() || undefined,
      message: formData.message.trim() || undefined,
      service: formData.service,
      source,
      consentement: formData.consentement,
      hp: formData.company,
    });

    if (result.success) {
      setStatus("success");
      setFormData(getInitialState(defaultService));
      toast({
        title: "Message envoyé !",
        description: "Merci, nous revenons vers vous très rapidement.",
      });
      onSuccess?.();
    } else {
      setStatus("error");
      setSubmitError("Une erreur est survenue. Veuillez réessayer dans quelques instants.");
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-6", className)}>
      {/* Honeypot — hidden from sighted users and unreachable via keyboard/AT */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor={`${uid}-company`}>Ne remplissez pas ce champ</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
      </div>

      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`${uid}-nom`} className="text-sm font-medium text-foreground">
            Nom complet *
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={`${uid}-nom`}
              ref={nomRef}
              type="text"
              placeholder="John Doe"
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
              className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
              aria-invalid={Boolean(fieldErrors.nom)}
              aria-describedby={fieldErrors.nom ? `${uid}-nom-error` : undefined}
              required
            />
          </div>
          {fieldErrors.nom && (
            <p id={`${uid}-nom-error`} role="alert" className="text-sm text-destructive">
              {fieldErrors.nom}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${uid}-email`} className="text-sm font-medium text-foreground">
            Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={`${uid}-email`}
              ref={emailRef}
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
              required
            />
          </div>
          {fieldErrors.email && (
            <p id={`${uid}-email-error`} role="alert" className="text-sm text-destructive">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone & Service */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`${uid}-telephone`} className="text-sm font-medium text-foreground">
            Téléphone
          </Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id={`${uid}-telephone`}
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
              className="pl-11 h-12 bg-secondary border-border focus:border-primary/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${uid}-service`} className="text-sm font-medium text-foreground">
            Service souhaité
          </Label>
          <Select
            value={formData.service}
            onValueChange={(value) => handleChange("service", value as ServiceOption)}
          >
            <SelectTrigger id={`${uid}-service`} className="h-12 bg-secondary border-border focus:border-primary/50">
              <SelectValue placeholder="Sélectionnez un service" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="focus:bg-primary/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor={`${uid}-message`} className="text-sm font-medium text-foreground">
          Votre message
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
          <Textarea
            id={`${uid}-message`}
            placeholder="Décrivez votre projet..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="pl-11 min-h-[120px] bg-secondary border-border focus:border-primary/50 resize-none"
          />
        </div>
      </div>

      {/* GDPR consent */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id={`${uid}-consentement`}
            ref={consentRef}
            checked={formData.consentement}
            onCheckedChange={(checked) => handleChange("consentement", checked === true)}
            className="mt-1"
            aria-invalid={Boolean(fieldErrors.consentement)}
            aria-describedby={fieldErrors.consentement ? `${uid}-consentement-error` : undefined}
            required
          />
          <Label
            htmlFor={`${uid}-consentement`}
            className="text-sm font-normal leading-snug text-muted-foreground cursor-pointer"
          >
            J'accepte que mes informations soient utilisées pour être recontacté(e), conformément à la{" "}
            <Link
              to="/politique-de-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              politique de confidentialité
            </Link>
            . *
          </Label>
        </div>
        {fieldErrors.consentement && (
          <p id={`${uid}-consentement-error`} role="alert" className="text-sm text-destructive">
            {fieldErrors.consentement}
          </p>
        )}
      </div>

      {/* Status feedback */}
      {status === "success" && (
        <p role="status" aria-live="polite" className="text-sm font-medium text-primary">
          Merci ! Votre message a bien été envoyé, nous revenons vers vous très vite.
        </p>
      )}
      {submitError && (
        <p role="alert" aria-live="assertive" className="text-sm font-medium text-destructive">
          {submitError}
        </p>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" variant="gradient" className="w-full h-12 group" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>
    </form>
  );
};
