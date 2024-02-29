'use client';
import ConversationCard from './ConversationCard';
import { useContext, useEffect } from 'react';
import useConversation from '../../app/(dashboard)/conversations/useConversation';
import { createSupabaseClient as supabase } from '@/utils/supabase/createSupabaseClient';
import { ConversationCardType } from '@/types/messagingTypes';
import DeleteConvoModal from '../DeleteConvoModal';

const ConversationsList: React.FC = () => {
  const {
    allConversations,
    setAllConversations,
    setCurrentConversation,
    setShowConversationsList,
  } = useContext(useConversation);

  const updateOpenConvo = async (givenId: number) => {
    setCurrentConversation &&
      setCurrentConversation(
        allConversations?.filter(
          (conversations) => conversations.conversation_id === givenId
        )[0]
      );

    setShowConversationsList(false);
  };

  useEffect(() => {
    const channel = supabase
      .channel('realtime conversations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_conversations',
        },
        (payload) => {
          setAllConversations((prevConversations) => [
            ...prevConversations,
            payload.new as ConversationCardType,
          ]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'user_conversations',
        },
        (payload) => {
          setAllConversations((prevConversations) => [
            ...prevConversations.filter(
              (conversation) => conversation.id !== payload.old.id
            ),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, allConversations, setAllConversations]);

  return (
<div className="m-4">
      {allConversations.length > 0 ? (
        allConversations.map((conversation, index) => (
          <div key={`${conversation.id}-${index}`}>
                        <DeleteConvoModal
              name='X'
              convoId={conversation.conversation_id}
              message='By pressing "confirm" you will delete this conversation'
            />
            <ConversationCard
              joinedAt={conversation.joined_at}
              itemName={conversation.items.item_name}
              imageSrc={conversation.items.imageSrc}
              clickHandler={() => updateOpenConvo(conversation.conversation_id)}
            />
          </div>
        ))
      ) : (
        <p>There are no active conversations</p>
      )}
 </div>
  );
};

export default ConversationsList;