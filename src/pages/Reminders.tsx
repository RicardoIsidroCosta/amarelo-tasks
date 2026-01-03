import { useState } from "react";
import { Plus, Bell, BellRing, Mail, Briefcase, User, Calendar, Trash2, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

type ReminderCategory = "personal" | "work";
type NotificationType = "page" | "email" | "both";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  category: ReminderCategory;
  notificationType: NotificationType;
  notified: boolean;
}

const categoryConfig = {
  personal: { label: "Pessoal", icon: User, color: "bg-blue-500/20 text-blue-400" },
  work: { label: "Trabalho", icon: Briefcase, color: "bg-amber-500/20 text-amber-400" },
};

const notificationConfig = {
  page: { label: "Página", icon: Bell },
  email: { label: "Email", icon: Mail },
  both: { label: "Ambos", icon: BellRing },
};

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Reunião com equipa",
      description: "Discussão do projeto Q1",
      date: "2024-01-10",
      time: "10:00",
      category: "work",
      notificationType: "both",
      notified: false,
    },
    {
      id: "2",
      title: "Consulta médica",
      date: "2024-01-15",
      time: "14:30",
      category: "personal",
      notificationType: "page",
      notified: false,
    },
    {
      id: "3",
      title: "Entrega do relatório",
      description: "Relatório mensal de vendas",
      date: "2024-01-20",
      time: "18:00",
      category: "work",
      notificationType: "email",
      notified: false,
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    category: "personal" as ReminderCategory,
    notificationType: "page" as NotificationType,
  });

  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ReminderCategory | "all">("all");

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.date && newReminder.time) {
      setReminders([
        ...reminders,
        {
          id: Date.now().toString(),
          ...newReminder,
          notified: false,
        },
      ]);
      setNewReminder({
        title: "",
        description: "",
        date: "",
        time: "",
        category: "personal",
        notificationType: "page",
      });
      setShowForm(false);
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const filteredReminders = reminders
    .filter((r) => filterCategory === "all" || r.category === filterCategory)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return format(dateObj, "d 'de' MMMM 'às' HH:mm", { locale: pt });
  };

  const workCount = reminders.filter((r) => r.category === "work").length;
  const personalCount = reminders.filter((r) => r.category === "personal").length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="text-gradient">Lembretes</span>
          </h1>
          <p className="text-muted-foreground">
            Nunca mais esqueça algo importante.
          </p>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setFilterCategory("all")}
            className={cn(
              "glass-card rounded-xl p-4 opacity-0 animate-fade-in transition-all duration-300",
              filterCategory === "all" && "border-primary/50"
            )}
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                filterCategory === "all" ? "bg-primary/20" : "bg-secondary"
              )}>
                <Bell className={cn("w-5 h-5", filterCategory === "all" ? "text-primary" : "text-muted-foreground")} />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-foreground">{reminders.length}</p>
                <p className="text-xs text-muted-foreground">Todos</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilterCategory("work")}
            className={cn(
              "glass-card rounded-xl p-4 opacity-0 animate-fade-in transition-all duration-300",
              filterCategory === "work" && "border-primary/50"
            )}
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                filterCategory === "work" ? "bg-amber-500/20" : "bg-secondary"
              )}>
                <Briefcase className={cn("w-5 h-5", filterCategory === "work" ? "text-amber-400" : "text-muted-foreground")} />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-foreground">{workCount}</p>
                <p className="text-xs text-muted-foreground">Trabalho</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilterCategory("personal")}
            className={cn(
              "glass-card rounded-xl p-4 opacity-0 animate-fade-in transition-all duration-300",
              filterCategory === "personal" && "border-primary/50"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                filterCategory === "personal" ? "bg-blue-500/20" : "bg-secondary"
              )}>
                <User className={cn("w-5 h-5", filterCategory === "personal" ? "text-blue-400" : "text-muted-foreground")} />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-foreground">{personalCount}</p>
                <p className="text-xs text-muted-foreground">Pessoal</p>
              </div>
            </div>
          </button>
        </div>

        {/* Add Reminder Button/Form */}
        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            variant="glass"
            className="w-full mb-6 h-14 opacity-0 animate-fade-in"
            style={{ animationDelay: "250ms" }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Lembrete
          </Button>
        ) : (
          <div className="glass-card rounded-xl p-5 mb-6 space-y-4 opacity-0 animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Título do lembrete..."
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                className="sm:col-span-2"
              />
              <Input
                placeholder="Descrição (opcional)"
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                className="sm:col-span-2"
              />
              <Input
                type="date"
                value={newReminder.date}
                onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              />
              <Input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>

            {/* Category Selection */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Categoria</p>
              <div className="flex gap-2">
                {(Object.keys(categoryConfig) as ReminderCategory[]).map((cat) => {
                  const config = categoryConfig[cat];
                  const Icon = config.icon;
                  return (
                    <button
                      key={cat}
                      onClick={() => setNewReminder({ ...newReminder, category: cat })}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300",
                        newReminder.category === cat
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification Type Selection */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tipo de Notificação</p>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(notificationConfig) as NotificationType[]).map((type) => {
                  const config = notificationConfig[type];
                  const Icon = config.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setNewReminder({ ...newReminder, notificationType: type })}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300",
                        newReminder.notificationType === type
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={() => setShowForm(false)} variant="ghost" className="flex-1">
                Cancelar
              </Button>
              <Button onClick={addReminder} variant="glow" className="flex-1">
                Guardar
              </Button>
            </div>
          </div>
        )}

        {/* Reminders List */}
        <div className="space-y-3">
          {filteredReminders.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center opacity-0 animate-fade-in">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum lembrete encontrado.</p>
              <p className="text-sm text-muted-foreground/70">Adicione o primeiro acima!</p>
            </div>
          ) : (
            filteredReminders.map((reminder, index) => {
              const catConfig = categoryConfig[reminder.category];
              const CatIcon = catConfig.icon;
              const notifConfig = notificationConfig[reminder.notificationType];
              const NotifIcon = notifConfig.icon;

              return (
                <div
                  key={reminder.id}
                  className="group glass-card rounded-xl p-5 hover-lift opacity-0 animate-slide-in"
                  style={{ animationDelay: `${300 + index * 80}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", catConfig.color)}>
                        <CatIcon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground">{reminder.title}</h3>
                        {reminder.description && (
                          <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateTime(reminder.date, reminder.time)}
                          </span>
                          
                          <span className="text-xs text-primary/70 flex items-center gap-1">
                            <NotifIcon className="w-3 h-3" />
                            {notifConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Email notification info */}
        <div className="mt-8 glass-card rounded-xl p-4 border-primary/20 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Notificações por Email</p>
              <p className="text-xs text-muted-foreground mt-1">
                Para ativar notificações por email, é necessário configurar o backend. 
                Conecte o Lovable Cloud para habilitar esta funcionalidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reminders;
