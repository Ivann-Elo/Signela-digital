import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import type { ServiceOption } from "@/types/lead";

interface PrestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prestation: {
    id: string;
    label: string;
    title: string;
  } | null;
}

// Maps a Prestations tab id (src/data/services.ts) to the fixed LeadForm
// "Service" options.
const SERVICE_BY_PRESTATION_ID: Record<string, ServiceOption> = {
  video: "video",
  ads: "publicite",
  content: "autre",
  identity: "identite",
  web: "site-web",
};

export const PrestationModal = ({ isOpen, onClose, prestation }: PrestationModalProps) => {
  if (!prestation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">{prestation.label}</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour nous donner plus d'informations sur votre projet.
          </DialogDescription>
        </DialogHeader>

        <LeadForm
          source={`Modale ${prestation.label}`}
          defaultService={SERVICE_BY_PRESTATION_ID[prestation.id] ?? "autre"}
          onSuccess={onClose}
          className="mt-4"
        />
      </DialogContent>
    </Dialog>
  );
};
