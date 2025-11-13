interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export const CharacterCounter = ({ current, max, className = "" }: CharacterCounterProps) => {
  const percentage = (current / max) * 100;
  const isNearLimit = percentage > 80;
  const isOverLimit = current > max;

  return (
    <div className={`text-xs text-right mt-1 ${className}`}>
      <span className={
        isOverLimit ? "text-destructive font-semibold" :
        isNearLimit ? "text-yellow-500" :
        "text-muted-foreground"
      }>
        {current} / {max}
      </span>
    </div>
  );
};
