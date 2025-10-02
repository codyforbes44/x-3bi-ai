import { Heart, Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">KALPESH</span>
            </div>
            <p className="text-muted-foreground">
              Non-profit organization providing free AI resources and technology to all humanity. Visit kalpesh.org
            </p>
          </div>
          
          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Free AI Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Tutorials</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">API Access</a></li>
            </ul>
          </div>
          
          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">About</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Our Mission</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Team</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Impact</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Partners</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Newsletter</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Volunteer</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Donate</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2025 KALPESH (kalpesh.org) • Non-Profit AI Resource Platform • All AI tools are free
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
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