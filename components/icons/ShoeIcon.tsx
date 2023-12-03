import { IconPropType } from '../filter/QuickBrowse';

const ShoeIcon: React.FC<IconPropType> = ({ category }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 15 15'
    >
      <path
        fill={category === 'shoes' ? '#FF9E5E' : 'currentColor'}
        d='M9.5 7a9.97 9.97 0 0 1-1.315-.948L6.01 3.221a.558.558 0 0 0-1 .279H5V5H3.209a.5.5 0 0 1-.357-.148S2.5 4 2 4h-.5a.5.5 0 0 0-.5.5V9h5.5c1.5 0 2 1 3.5 1h4v-.5C14 8 10.547 7.594 9.5 7Zm0 4a3.131 3.131 0 0 1-1.526-.447A4.1 4.1 0 0 0 6 10H1v1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V11a3.134 3.134 0 0 1 1.526.447A4.1 4.1 0 0 0 9.5 12h4a.5.5 0 0 0 .5-.5V11Z'
      />
    </svg>
  );
};

export default ShoeIcon;
