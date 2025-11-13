import { Github, Twitter, MessageCircle, Heart } from "lucide-react";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Bottom Section - Icon Only */}
        <div className="flex items-center justify-between">
          {/* Copyright - Icon + Year Only */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-4 h-4" />
            <span className="text-xs">2025</span>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <LongPressTooltip content="GitHub">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all p-2">
                <Github className="w-5 h-5" />
              </a>
            </LongPressTooltip>
            <LongPressTooltip content="Twitter">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all p-2">
                <Twitter className="w-5 h-5" />
              </a>
            </LongPressTooltip>
            <LongPressTooltip content="Community">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-all p-2">
                <MessageCircle className="w-5 h-5" />
              </a>
            </LongPressTooltip>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;