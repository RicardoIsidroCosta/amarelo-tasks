import { useState } from "react";
import { Plus, ListChecks, CheckCircle2, Circle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskItem from "@/components/TaskItem";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Criar design system moderno", completed: true },
    { id: "2", text: "Implementar lista de tarefas", completed: true },
    { id: "3", text: "Adicionar animações suaves", completed: false },
    { id: "4", text: "Testar responsividade", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

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
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
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
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="glass-card rounded-xl p-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
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

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center opacity-0 animate-fade-in">
              <ListChecks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma tarefa ainda.</p>
              <p className="text-sm text-muted-foreground/70">Adicione a sua primeira tarefa acima!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                text={task.text}
                completed={task.completed}
                onToggle={toggleTask}
                onDelete={deleteTask}
                delay={250 + index * 50}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
