"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  LayoutDashboard,
  Workflow,
  CalendarDays,
  UsersRound,
  ChevronDown,
  Search,
  Bell,
  ArrowUpRight,
  Check,
  Plus,
  Settings2,
  ChevronsUpDown,
} from "lucide-react";
import { OperoMark } from "@/components/brand";

const tabs = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Workflows", icon: Workflow },
  { label: "Schedule", icon: CalendarDays },
  { label: "Customers", icon: UsersRound },
] as const;
type Tab = (typeof tabs)[number]["label"];
const tasks = [
  {
    name: "Prepare client proposal",
    detail: "Client onboarding",
    initials: "AM",
    status: "In progress",
  },
  {
    name: "Confirm upcoming appointments",
    detail: "Service operations",
    initials: "JL",
    status: "To do",
  },
  {
    name: "Review project deliverables",
    detail: "Project management",
    initials: "KR",
    status: "Complete",
  },
];
const events = [
  {
    time: "09:00",
    title: "Discovery consultation",
    person: "Alex Morgan",
    color: "indigo",
  },
  {
    time: "11:30",
    title: "Service appointment",
    person: "Jamie Lee",
    color: "cyan",
  },
  {
    time: "14:00",
    title: "Project check-in",
    person: "Kai Rivera",
    color: "indigo",
  },
];

export function Dashboard({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const reduce = useReducedMotion();
  return (
    <div className={`dashboard-wrap ${compact ? "dashboard-compact" : ""}`}>
      <div className="concept-bar">
        <span>
          <span className="status-dot" /> OPERO / PRODUCT CONCEPT
        </span>
        <span>Illustrative interface · Sample data</span>
      </div>
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <div className="dashboard-brand">
            <OperoMark />
            <span>opero</span>
          </div>
          <div className="demo-org">
            <span className="org-avatar">S</span>
            <div>
              Studio workspace<small>Example organization</small>
            </div>
            <ChevronsUpDown size={12} />
          </div>
          <div className="dashboard-nav" aria-label="Product concept views">
            {tabs.map(({ label, icon: TabIcon }) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                aria-pressed={tab === label}
                className={tab === label ? "selected" : ""}
              >
                <TabIcon size={15} strokeWidth={1.7} />
                {label}
                {label === "Workflows" && <span className="nav-count">8</span>}
              </button>
            ))}
          </div>
          <div className="sidebar-bottom">
            <span>
              <Settings2 size={14} /> Organization settings
            </span>
            <div className="demo-person">
              <span className="avatar">AM</span>
              <div>
                Alex Morgan<small>Sample administrator</small>
              </div>
            </div>
          </div>
        </aside>
        <div className="dashboard-content">
          <div className="dashboard-topbar">
            <span>
              Workspace <span className="slash">/</span> <strong>{tab}</strong>
            </span>
            <div>
              <Search size={14} />
              <Bell size={14} />
              <span className="avatar small-avatar">AM</span>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              className="dashboard-page"
              initial={reduce ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <div className="dashboard-heading">
                <div>
                  <h3>
                    {tab === "Overview"
                      ? "A little clarity for your day."
                      : tab === "Workflows"
                        ? "Keep the work moving."
                        : tab === "Schedule"
                          ? "Make room for what matters."
                          : "Know the people behind the work."}
                  </h3>
                  <p>
                    {tab === "Overview"
                      ? "Here's what's happening across your business."
                      : `An illustrative ${tab.toLowerCase()} experience for a sample business.`}
                  </p>
                </div>
                <span className="demo-date">
                  Oct 12 – 18 <ChevronDown size={11} />
                </span>
              </div>
              {tab === "Overview" ? (
                <>
                  <div className="dashboard-stats">
                    {[
                      {
                        label: "Active workflows",
                        value: "24",
                        note: "Across 4 teams",
                        bars: [25, 40, 35, 65, 50, 75, 90],
                      },
                      {
                        label: "Upcoming appointments",
                        value: "18",
                        note: "This week",
                        bars: [40, 60, 50, 65, 90, 80, 95],
                      },
                      {
                        label: "Tasks completed",
                        value: "32",
                        note: "This week",
                        bars: [20, 35, 40, 30, 55, 75, 95],
                      },
                    ].map((stat) => (
                      <div className="dashboard-stat" key={stat.label}>
                        <span>
                          {stat.label}
                          <ArrowUpRight size={12} />
                        </span>
                        <div>
                          <strong>{stat.value}</strong>
                          <div className="mini-bars" aria-hidden="true">
                            {stat.bars.map((height, i) => (
                              <i key={i} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                        </div>
                        <small>{stat.note}</small>
                      </div>
                    ))}
                  </div>
                  <div className="dashboard-widgets">
                    <div className="workflow-widget">
                      <div className="widget-title">
                        <h4>Workflow overview</h4>
                        <span>
                          This week <ChevronDown size={10} />
                        </span>
                      </div>
                      <div
                        className="chart"
                        role="img"
                        aria-label="Sample workflow activity chart, showing activity across Monday to Sunday"
                      >
                        <div className="chart-y">
                          <span>30</span>
                          <span>20</span>
                          <span>10</span>
                        </div>
                        <div className="chart-bars">
                          {[42, 66, 53, 85, 71, 94, 77].map((height, i) => (
                            <div className="chart-column" key={i}>
                              <div className="bar-track">
                                <i style={{ height: `${height}%` }} />
                                <i style={{ height: `${height * 0.5}%` }} />
                              </div>
                              <span>
                                {["M", "T", "W", "T", "F", "S", "S"][i]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="chart-legend">
                        <span>
                          <i /> In progress
                        </span>
                        <span>
                          <i /> Completed
                        </span>
                      </div>
                    </div>
                    <div className="activity-widget">
                      <div className="widget-title">
                        <h4>Recent activity</h4>
                        <span className="demo-label">Sample</span>
                      </div>
                      {[
                        {
                          title: "New customer added",
                          detail: "Jamie Lee · 12 min ago",
                          icon: UsersRound,
                        },
                        {
                          title: "Workflow completed",
                          detail: "Client onboarding · 35 min ago",
                          icon: Check,
                        },
                        {
                          title: "Appointment scheduled",
                          detail: "Consultation · 1 hour ago",
                          icon: CalendarDays,
                        },
                      ].map(({ title, detail, icon: ActivityIcon }) => (
                        <div className="activity-item" key={title}>
                          <span className="activity-icon">
                            <ActivityIcon size={13} />
                          </span>
                          <div>
                            {title}
                            <small>{detail}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              {(tab === "Overview" || tab === "Workflows") && (
                <div className="tasks-widget">
                  <div className="widget-title">
                    <h4>
                      {tab === "Overview"
                        ? "Your team's priorities"
                        : "Sample workflow board"}
                    </h4>
                    <span>
                      <Plus size={11} /> Planned task management
                    </span>
                  </div>
                  {tasks.map((task) => (
                    <div className="task-row" key={task.name}>
                      <span
                        className={`task-check ${task.status === "Complete" ? "checked" : ""}`}
                      >
                        {task.status === "Complete" && <Check size={9} />}
                      </span>
                      <div>
                        {task.name}
                        {tab === "Workflows" && <small>{task.detail}</small>}
                      </div>
                      <span
                        className={`task-status status-${task.status.toLowerCase().replace(" ", "-")}`}
                      >
                        {task.status}
                      </span>
                      <span className="avatar small-avatar">
                        {task.initials}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "Schedule" && (
                <div className="schedule-preview">
                  <div className="schedule-days">
                    {["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"].map(
                      (day, i) => (
                        <span className={i === 0 ? "active" : ""} key={day}>
                          {day}
                        </span>
                      ),
                    )}
                  </div>
                  {events.map((event) => (
                    <div
                      className={`schedule-event ${event.color}`}
                      key={event.time}
                    >
                      <span>{event.time}</span>
                      <div>
                        <h4>{event.title}</h4>
                        <p>{event.person} · Example booking</p>
                      </div>
                      <CalendarDays size={18} />
                    </div>
                  ))}
                </div>
              )}
              {tab === "Customers" && (
                <div className="customer-preview">
                  <div className="customer-table-head">
                    <span>Customer</span>
                    <span>Service interest</span>
                    <span>Status</span>
                  </div>
                  {[
                    {
                      name: "Alex Morgan",
                      initials: "AM",
                      service: "Consulting",
                      status: "Active",
                    },
                    {
                      name: "Jamie Lee",
                      initials: "JL",
                      service: "Design services",
                      status: "New inquiry",
                    },
                    {
                      name: "Kai Rivera",
                      initials: "KR",
                      service: "Project support",
                      status: "Active",
                    },
                  ].map((customer) => (
                    <div className="customer-row" key={customer.name}>
                      <div>
                        <span className="avatar">{customer.initials}</span>
                        {customer.name}
                      </div>
                      <span>{customer.service}</span>
                      <span className="task-status">{customer.status}</span>
                    </div>
                  ))}
                  <p className="sample-note">
                    Fictional customers shown to demonstrate the intended
                    experience.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="dashboard-disclaimer">
            Concept preview only. Features, layout, and availability are subject
            to development.
          </div>
        </div>
      </div>
    </div>
  );
}
