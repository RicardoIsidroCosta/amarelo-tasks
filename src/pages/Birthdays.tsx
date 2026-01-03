import { useState } from "react";
import { Plus, CalendarHeart, PartyPopper } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BirthdayCard from "@/components/BirthdayCard";

interface Birthday {
  id: string;
  name: string;
  date: string;
}

const Birthdays = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([
    { id: "1", name: "Maria Silva", date: "2024-01-15" },
    { id: "2", name: "João Santos", date: "2024-01-08" },
    { id: "3", name: "Ana Costa", date: "2024-02-20" },
    { id: "4", name: "Pedro Oliveira", date: "2024-01-03" },
  ]);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");

  const getDaysUntilBirthday = (dateStr: string): number => {
    const today = new Date();
    const [, month, day] = dateStr.split("-").map(Number);
    
    let birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
    
    if (birthdayThisYear < today) {
      birthdayThisYear = new Date(today.getFullYear() + 1, month - 1, day);
    }
    
    const diffTime = birthdayThisYear.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 365 ? 0 : diffDays;
  };

  const addBirthday = () => {
    if (newName.trim() && newDate) {
      setBirthdays([
        ...birthdays,
        { id: Date.now().toString(), name: newName.trim(), date: newDate },
      ]);
      setNewName("");
      setNewDate("");
    }
  };

  const deleteBirthday = (id: string) => {
    setBirthdays(birthdays.filter((b) => b.id !== id));
  };

  const sortedBirthdays = [...birthdays].sort(
    (a, b) => getDaysUntilBirthday(a.date) - getDaysUntilBirthday(b.date)
  );

  const upcomingCount = birthdays.filter((b) => getDaysUntilBirthday(b.date) <= 30).length;
  const todayCount = birthdays.filter((b) => getDaysUntilBirthday(b.date) === 0).length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="text-gradient">Aniversários</span>
          </h1>
          <p className="text-muted-foreground">
            Nunca mais esqueça uma data especial.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <PartyPopper className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{todayCount}</p>
                <p className="text-sm text-muted-foreground">Hoje</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <CalendarHeart className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingCount}</p>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Birthday */}
        <div className="glass-card rounded-xl p-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Nome da pessoa..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="sm:w-40"
            />
            <Button onClick={addBirthday} variant="glow" size="icon" className="shrink-0">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Birthdays List */}
        <div className="grid gap-4">
          {sortedBirthdays.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center opacity-0 animate-fade-in">
              <CalendarHeart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum aniversário registado.</p>
              <p className="text-sm text-muted-foreground/70">Adicione o primeiro acima!</p>
            </div>
          ) : (
            sortedBirthdays.map((birthday, index) => (
              <BirthdayCard
                key={birthday.id}
                id={birthday.id}
                name={birthday.name}
                date={birthday.date}
                daysUntil={getDaysUntilBirthday(birthday.date)}
                onDelete={deleteBirthday}
                delay={250 + index * 80}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Birthdays;
