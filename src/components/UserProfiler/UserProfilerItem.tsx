interface UserProfilerItemProps {
  fieldName: string;
  icon: React.ReactNode;
  userData: string;
}

export const UserProfilerItem = ({ fieldName, icon, userData }: UserProfilerItemProps) => {
  return (
    <li>
      <strong>
        {icon}
        {fieldName}:
      </strong>{' '}
      {userData}
    </li>
  );
};
