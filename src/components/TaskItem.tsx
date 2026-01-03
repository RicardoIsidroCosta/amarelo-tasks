import { Check, Trash2, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  delay?: number;
}

const TaskItem = ({ id, text, completed, createdAt, completedAt, onToggle, onDelete, delay = 0 }: TaskItemProps) => {
  return (
    <div
      className="group glass-card rounded-xl p-4 hover-lift opacity-0 animate-slide-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(id)}
          className={cn(
            "task-checkbox flex items-center justify-center shrink-0",
            completed && "checked"
          )}
        >
          {completed && <Check className="w-3 h-3 text-primary-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "block text-foreground transition-all duration-300",
              completed && "line-through text-muted-foreground"
            )}
          >
            {text}
          </span>
          
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Criada: {format(createdAt, "d MMM", { locale: pt })}
            </span>
            
            {completed && completedAt && (
              <span className="text-xs text-primary/70 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Concluída: {format(completedAt, "d MMM", { locale: pt })}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
