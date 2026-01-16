import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Prestations } from "@/components/Prestations";
import { Process } from "@/components/Process";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Prestations />
        <Process />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
