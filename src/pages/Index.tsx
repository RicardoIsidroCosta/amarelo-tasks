import { useState } from "react";
import { Plus, ListChecks, CheckCircle2, Circle, History, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskItem from "@/components/TaskItem";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Criar design system moderno", completed: true, createdAt: new Date(2024, 0, 1), completedAt: new Date(2024, 0, 2) },
    { id: "2", text: "Implementar lista de tarefas", completed: true, createdAt: new Date(2024, 0, 2), completedAt: new Date(2024, 0, 3) },
    { id: "3", text: "Adicionar animações suaves", completed: false, createdAt: new Date() },
    { id: "4", text: "Testar responsividade", completed: false, createdAt: new Date() },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { 
          id: Date.now().toString(), 
          text: newTask.trim(), 
          completed: false,
          createdAt: new Date()
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined
            } 
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Minhas <span className="text-gradient">Tarefas</span>
          </h1>
          <p className="text-muted-foreground">
            Organize o seu dia, conquiste os seus objetivos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedTasks.length}</p>
                <p className="text-sm text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Circle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeTasks.length}</p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="glass-card rounded-xl p-4 opacity-0 animate-fade-in hover:border-primary/50 transition-all duration-300"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${showHistory ? 'bg-primary/20' : 'bg-secondary'}`}>
                <History className={`w-5 h-5 ${showHistory ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Histórico</p>
                <p className="text-xs text-muted-foreground">{showHistory ? 'Ocultar' : 'Ver'}</p>
              </div>
            </div>
          </button>
        </div>

        {/* Add Task */}
        <div className="glass-card rounded-xl p-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="flex gap-3">
            <Input
              placeholder="Adicionar nova tarefa..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Button onClick={addTask} variant="glow" size="icon">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Active Tasks List */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Tarefas Ativas
          </h2>
          {activeTasks.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center opacity-0 animate-fade-in">
              <ListChecks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Todas as tarefas concluídas!</p>
            </div>
          ) : (
            activeTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                text={task.text}
                completed={task.completed}
                createdAt={task.createdAt}
                onToggle={toggleTask}
                onDelete={deleteTask}
                delay={300 + index * 50}
              />
            ))
          )}
        </div>

        {/* Completed Tasks History */}
        {showHistory && completedTasks.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4" />
              Histórico de Concluídas
            </h2>
            {completedTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                text={task.text}
                completed={task.completed}
                createdAt={task.createdAt}
                completedAt={task.completedAt}
                onToggle={toggleTask}
                onDelete={deleteTask}
                delay={index * 50}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
