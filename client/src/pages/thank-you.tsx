import { CheckCircle2, Mail, BookOpen, RefreshCw, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Variant = 'A' | 'B';

export default function ThankYou() {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [variant, setVariant] = useState<Variant>('A');
  const { toast } = useToast();

  useEffect(() => {
    const selectedVariant = (Math.random() > 0.5 ? 'A' : 'B') as Variant;
    setVariant(selectedVariant);
    
    trackEvent('page_view', { variant: selectedVariant });

    const timer = setTimeout(() => {
      setIsVisible(true);
      fireConfetti();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const fireConfetti = () => {
    const colors = ['#FF5722', '#FF6F3C', '#FFA726', '#FFFFFF'];
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resendEmailMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/resend-email', {});
    },
    onSuccess: () => {
      toast({
        title: "E-mail reenviado!",
        description: "Verifique sua caixa de entrada novamente.",
      });
      trackEvent('email_resend', { variant });
      setCountdown(300);
    },
    onError: () => {
      toast({
        title: "Erro ao reenviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  const handleReturnToSite = () => {
    trackEvent('cta_click', { variant });
    window.location.href = "https://www.suabiblioteca.shop";
  };

  const handleResendEmail = () => {
    resendEmailMutation.mutate();
  };

  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, data);
    }
    console.log('Analytics Event:', eventName, data);
  };

  const titleText = variant === 'A' ? 'Acesso Confirmado!' : 'Parabéns! Tudo Certo!';
  const ctaText = variant === 'A' ? 'Volte ao Site' : 'Explorar Mais Títulos';

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      <div 
        className={`w-full max-w-2xl mx-auto space-y-8 sm:space-y-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div 
          className={`flex flex-col items-center gap-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <BadgeCheck 
                className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF5722] fill-[#FF5722]/20" 
                strokeWidth={2.5}
                data-testid="icon-badge-logo"
              />
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
              data-testid="text-brand"
            >
              Mentalidade Elite
            </h2>
          </div>
          
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
            {titleText}
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

          <div className="flex items-center justify-center gap-2 text-[#FF5722] text-sm sm:text-base font-semibold">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" data-testid="icon-countdown" />
            <p data-testid="text-countdown">
              Tempo estimado: {formatTime(countdown)}
            </p>
          </div>

          {countdown === 0 && (
            <div 
              className="pt-2 transition-all duration-500"
              data-testid="container-resend"
            >
              <p className="text-gray-400 text-sm mb-3">
                Não recebeu o e-mail?
              </p>
              <Button
                onClick={handleResendEmail}
                disabled={resendEmailMutation.isPending}
                variant="outline"
                size="sm"
                className="border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
                data-testid="button-resend-email"
              >
                {resendEmailMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Reenviando...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Reenviar E-mail</span>
                  </>
                )}
              </Button>
            </div>
          )}
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
              <span>{ctaText}</span>
            </Button>
          </div>
        </div>

        <footer 
          className={`pt-8 sm:pt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <p 
              className="text-gray-600 text-xs sm:text-sm"
              data-testid="text-contact"
            >
              Alguma dúvida? Contate-nos{" "}
              <a 
                href="mailto:suporte@suabiblioteca.shop"
                className="text-[#FF5722] hover:text-[#E64A19] transition-colors duration-200 underline"
                data-testid="link-email-support"
              >
                suporte@suabiblioteca.shop
              </a>
            </p>
          </div>
          
          <p className="text-center text-gray-700 text-xs mt-4" data-testid="text-variant">
            Versão: {variant}
          </p>
        </footer>
      </div>
    </div>
  );
}
