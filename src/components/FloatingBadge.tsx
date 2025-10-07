const FloatingBadge = () => {
  return (
    <a
      href="https://3bi.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border rounded-full text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth shadow-elegant hover:shadow-lg hover:scale-105"
      aria-label="Powered by Cody Forbes"
    >
      Powered by Cᴏᴅʏ Fᴏʀʙᴇꜱ
    </a>
  );
};

export default FloatingBadge;
