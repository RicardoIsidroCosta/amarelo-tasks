import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  delay?: number;
}

const TaskItem = ({ id, text, completed, onToggle, onDelete, delay = 0 }: TaskItemProps) => {
  return (
    <div
      className="group glass-card rounded-xl p-4 flex items-center gap-4 hover-lift opacity-0 animate-slide-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "task-checkbox flex items-center justify-center shrink-0",
          completed && "checked"
        )}
      >
        {completed && <Check className="w-3 h-3 text-primary-foreground" />}
      </button>

      <span
        className={cn(
          "flex-1 text-foreground transition-all duration-300",
          completed && "line-through text-muted-foreground"
        )}
      >
        {text}
      </span>

      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskItem;
