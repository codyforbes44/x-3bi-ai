import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github, Twitter, MessageCircle, Heart } from "lucide-react";
import { LongPressTooltip } from "@/components/visual/LongPressTooltip";
import { FOOTER_NAV_GROUPS } from "@/config/navigation";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {FOOTER_NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-sm mb-4">{t(group.title)}</h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                    >
                      <item.icon className="w-3 h-3" />
                      {t(item.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-4 h-4" />
            <span className="text-xs">© 2025 3BI.AI. All rights reserved.</span>
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