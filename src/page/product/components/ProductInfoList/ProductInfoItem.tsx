export const ProductInfoItem = ({ info, label }: { label: string; info: string }) => {
  return (
    <li>
      <strong>{label}: </strong>
      {info}
    </li>
  );
};
