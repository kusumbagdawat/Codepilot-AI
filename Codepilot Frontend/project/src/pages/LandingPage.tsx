import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-base-primary">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
