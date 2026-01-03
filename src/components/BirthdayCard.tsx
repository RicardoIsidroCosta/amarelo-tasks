import { Cake, Trash2, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface BirthdayCardProps {
  id: string;
  name: string;
  date: string;
  daysUntil: number;
  onDelete: (id: string) => void;
  delay?: number;
}

const BirthdayCard = ({ id, name, date, daysUntil, onDelete, delay = 0 }: BirthdayCardProps) => {
  const isToday = daysUntil === 0;
  const isSoon = daysUntil > 0 && daysUntil <= 7;

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split("-");
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]}`;
  };

  return (
    <div
      className={cn(
        "group glass-card rounded-xl p-5 hover-lift opacity-0 animate-scale-in relative overflow-hidden",
        isToday && "border-primary/50 animate-pulse-glow"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isToday && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              isToday
                ? "bg-primary text-primary-foreground"
                : isSoon
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {isToday ? <Gift className="w-6 h-6" /> : <Cake className="w-6 h-6" />}
          </div>

          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
          </div>
        </div>

        <button
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        {isToday ? (
          <span className="text-primary font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Hoje é o dia!
          </span>
        ) : (
          <span className={cn("text-sm", isSoon ? "text-primary" : "text-muted-foreground")}>
            {daysUntil === 1 ? "Amanhã" : `Faltam ${daysUntil} dias`}
          </span>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
