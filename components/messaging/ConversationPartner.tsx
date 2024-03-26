import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProfile } from '@/utils/supabase/getProfile';
import { createSupabaseClient as supabase } from '../../utils/supabase/createSupabaseClient';

type ConversationPartnerProps = {
  conversation_id: number;
  user_conversationId: number;
  hideImage?: boolean;
};

type ConversationPartnerType = {
  username: string;
  avatar: string;
};

/**
 *
 * @param conversation_id refers to the relevant "converstion_id" value returned from the user_conversations table
 * @param user_conversationId refers to the relevant "id" value returned from the user_conversations table
 * @param hideImage is optional and allows us to display only the users name without an avatar.
 *                  If this parameter is excluded an avatar will be displayed with either the users image or a default avatar if none has been set.
 */
export const ConversationPartner: React.FC<ConversationPartnerProps> = ({
  conversation_id,
  user_conversationId,
  hideImage,
}) => {
  const [conversationPartner, setConversationPartner] = useState<
    ConversationPartnerType | undefined
  >();

  useEffect(() => {
    const getConversationPartner = async () => {
      const { data: interlocutors } = await supabase
        .from('user_conversations')
        .select('user_id')
        .eq('conversation_id', conversation_id)
        .neq('id', user_conversationId);

      const partnerProfile = await getProfile(
        supabase,
        interlocutors?.[0].user_id
      );

      setConversationPartner(partnerProfile.data);
    };

    getConversationPartner();
  }, [conversation_id]);

  return (
    <div className='flex flex-row items-center'>
      <p data-testid='item-donor'>{conversationPartner?.username}</p>

      {!hideImage && (
        <Image
          className='ml-2 rounded-full'
          alt='user logo'
          width='25'
          height='35'
          src={conversationPartner?.avatar ?? '/default-profile.png'}
          style={{ width: 'auto', height: 'auto' }}
        />
      )}
    </div>
  );
};
