import {
  Layers3,
  Expand,
  CodeXml,
  BriefcaseBusiness,
  CalendarDays,
  PenTool,
  Store,
  ChartNoAxesCombined,
  Network,
  LayoutDashboard,
  UsersRound,
  Workflow,
  Settings2,
  type LucideIcon,
} from "lucide-react";
const icons: Record<string, LucideIcon> = {
  layers: Layers3,
  expand: Expand,
  code: CodeXml,
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  pen: PenTool,
  store: Store,
  chart: ChartNoAxesCombined,
  network: Network,
  dashboard: LayoutDashboard,
  users: UsersRound,
  workflow: Workflow,
  settings: Settings2,
};
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = icons[name] || Layers3;
  return (
    <Component
      size={23}
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    />
  );
}
