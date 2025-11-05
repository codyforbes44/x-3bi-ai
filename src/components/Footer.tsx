import { Heart, Github, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FOOTER_NAV_GROUPS } from "@/config/routes";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">3BI.AI</span>
            </div>
            <p className="text-muted-foreground">
              Premium AI Platform - Unlock the full potential of AI with enterprise-grade tools, advanced models, and professional support. Visit 3bi.ai
            </p>
          </div>
          
          {/* Dynamic Navigation Groups */}
          {FOOTER_NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="font-semibold">{group.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="hover:text-foreground transition-smooth"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="border-t border-border pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
              © 2025 3BI.AI (3bi.ai) • Premium AI Platform • Powered by Cᴏᴅʏ Fᴏʀʙᴇꜱ
            </div>
            
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth touch-target p-2" aria-label="Visit our GitHub repository">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth touch-target p-2" aria-label="Follow us on Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth touch-target p-2" aria-label="Join our community chat">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;