import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useRealtime } from '@/contexts/RealtimeContext';

export function PresenceIndicator() {
  const { presenceUsers } = useRealtime();

  if (presenceUsers.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-muted-foreground" />
      <div className="flex -space-x-2">
        {presenceUsers.slice(0, 5).map((user) => (
          <Avatar key={user.user_id} className="w-8 h-8 border-2 border-background">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {presenceUsers.length > 5 && (
        <Badge variant="secondary" className="text-xs">
          +{presenceUsers.length - 5}
        </Badge>
      )}
    </div>
  );
}
