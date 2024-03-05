import Image from 'next/image';
import CardMenu from './CardMenu';

export type ConversationCardProps = {
  joinedAt: string;
  itemName: string;
  imageSrc: string;
  conversationId: number;
  clickHandler: () => void;
};

const formatString = (input: string) => {
  const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
  const cappedLength =
    capitalized.length > 15
      ? capitalized.substring(0, 15) + '...'
      : capitalized;

  return cappedLength;
};

const ConversationCard: React.FC<ConversationCardProps> = ({
  joinedAt,
  itemName,
  imageSrc,
  conversationId,
  clickHandler,
}) => {
  return (
    <button type='button' onClick={clickHandler}>
      <div className='relative m-2 flex max-h-28 w-[400px] items-center gap-4 rounded-lg bg-gray-300 p-4 shadow-md hover:shadow-lg'>
        <div className='relative h-[65px] w-[65px]'>
          <Image src={imageSrc} fill className='rounded-full' alt={itemName} />
        </div>
        <div className='pl-4 text-left'>
          <h2 className='text-lg font-bold'>{formatString(itemName)}</h2>
          <p className='text-sm font-light italic'>This will be a message...</p>
        </div>
        <div className='ml-auto flex flex-col items-center gap-4 pl-8 pr-2'>
          <CardMenu conversationId={conversationId} />
          <p className='font-light italic'>{joinedAt?.slice(5, 10)}</p>
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
