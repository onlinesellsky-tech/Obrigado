import { CheckCircle2, Mail, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReturnToSite = () => {
    window.location.href = "https://example.com";
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      <div 
        className={`w-full max-w-2xl mx-auto space-y-8 sm:space-y-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div 
          className={`flex justify-center transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative">
            <CheckCircle2 
              className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF5722]" 
              strokeWidth={2}
              data-testid="icon-success"
            />
            <div className="absolute inset-0 bg-[#FF5722] opacity-20 blur-2xl rounded-full animate-pulse" />
          </div>
        </div>

        <div 
          className={`text-center space-y-4 sm:space-y-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF5722] leading-tight"
            data-testid="text-title"
          >
            Acesso Confirmado!
          </h1>
          
          <div className="w-20 sm:w-24 h-1 bg-[#FF5722] mx-auto rounded-full" data-testid="divider-orange" />
          
          <p 
            className="text-base sm:text-lg md:text-xl text-white leading-relaxed px-4 sm:px-6 font-normal max-w-xl mx-auto"
            data-testid="text-message"
          >
            O acesso para os melhores best-sellers já está sendo enviado para o seu e-mail. Você fez uma ótima escolha!
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" data-testid="icon-email" />
            <p data-testid="text-instructions">
              Verifique sua caixa de entrada, spam ou promoções
            </p>
          </div>

          <p className="text-gray-500 text-xs sm:text-sm" data-testid="text-timing">
            Em poucos minutos, você terá o link.
          </p>
        </div>

        <div 
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div 
            className="bg-black border-2 border-[#FF5722] rounded-lg p-6 sm:p-8 space-y-4 sm:space-y-6 mx-auto max-w-lg"
            data-testid="card-cta"
          >
            <p 
              className="text-white text-center font-semibold text-base sm:text-lg leading-relaxed"
              data-testid="text-cta-prompt"
            >
              Gostaria de explorar mais títulos enquanto aguarda?
            </p>
            
            <Button
              onClick={handleReturnToSite}
              variant="default"
              size="lg"
              className="w-full bg-[#FF5722] border-2 border-[#E64A19] text-white font-bold text-sm sm:text-base uppercase"
              data-testid="button-return-site"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Volte ao Site</span>
            </Button>
          </div>
        </div>

        <footer 
          className={`pt-8 sm:pt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm">
            <a 
              href="#" 
              className="hover:text-[#FF5722] transition-colors duration-200"
              data-testid="link-privacy"
            >
              Política de Privacidade
            </a>
            <span className="text-gray-700">|</span>
            <a 
              href="#" 
              className="hover:text-[#FF5722] transition-colors duration-200"
              data-testid="link-help"
            >
              Ajuda
            </a>
            <span className="text-gray-700">|</span>
            <a 
              href="#" 
              className="hover:text-[#FF5722] transition-colors duration-200"
              data-testid="link-contact"
            >
              Contato
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
