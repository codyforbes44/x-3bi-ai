import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { RealtimeChannel } from '@supabase/supabase-js';

interface PresenceUser {
  user_id: string;
  username: string;
  online_at: string;
}

interface RealtimeContextType {
  presenceUsers: PresenceUser[];
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  broadcastMessage: (message: any) => void;
  currentRoom: string | null;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [presenceUsers, setPresenceUsers] = useState<PresenceUser[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const joinRoom = (roomId: string) => {
    if (!user) return;

    // Leave existing room first
    if (channel) {
      channel.unsubscribe();
    }

    const newChannel = supabase.channel(`room:${roomId}`, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    newChannel
      .on('presence', { event: 'sync' }, () => {
        const state = newChannel.presenceState();
        const users: PresenceUser[] = [];
        
        for (const key in state) {
          const presences = state[key] as any[];
          presences.forEach((presence) => {
            if (presence.user_id && presence.username) {
              users.push(presence as PresenceUser);
            }
          });
        }
        
        setPresenceUsers(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await newChannel.track({
            user_id: user.id,
            username: user.email?.split('@')[0] || 'Anonymous',
            online_at: new Date().toISOString(),
          });
        }
      });

    setChannel(newChannel);
    setCurrentRoom(roomId);
  };

  const leaveRoom = () => {
    if (channel) {
      channel.unsubscribe();
      setChannel(null);
      setCurrentRoom(null);
      setPresenceUsers([]);
    }
  };

  const broadcastMessage = (message: any) => {
    if (!channel) return;
    channel.send({
      type: 'broadcast',
      event: 'message',
      payload: message,
    });
  };

  useEffect(() => {
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [channel]);

  return (
    <RealtimeContext.Provider
      value={{
        presenceUsers,
        joinRoom,
        leaveRoom,
        broadcastMessage,
        currentRoom,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider');
  }
  return context;
}
