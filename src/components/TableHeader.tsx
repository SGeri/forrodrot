interface TableHeaderProps {
  min?: number;
  max?: number;
  children: React.ReactNode;
}

export default function TableHeader({
  min = 250,
  max = 500,
  children,
}: TableHeaderProps) {
  return (
    <th style={{ wordWrap: "break-word", minWidth: min, maxWidth: max }}>
      {children}
    </th>
  );
}
