import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SettingCardProps = {
  title: string;
  description: string;
  action: React.ReactNode;
};

/** Cartão de "configuração do mês": título, valor atual e um botão de editar. */
export function SettingCard({ title, description, action }: SettingCardProps) {
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          {action}
        </div>
      </CardContent>
    </Card>
  );
}
