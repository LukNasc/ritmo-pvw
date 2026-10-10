"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ValueDrawerProps = {
  trigger: React.ReactElement;
  title: string;
  description?: string;
  label: string;
  placeholder?: string;
  /** Texto exibido no campo ao abrir. */
  initialValue: string;
  /** Recebe o texto digitado. Devolve a mensagem de erro, ou null se salvou. */
  onSubmit: (raw: string) => Promise<string | null>;
};

/** Drawer de um único campo. Base para comissão base e saldo inicial. */
export function ValueDrawer({
  trigger,
  title,
  description,
  label,
  placeholder,
  initialValue,
  onSubmit,
}: ValueDrawerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setValue(initialValue);
      setError(null);
    }
    setOpen(next);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);

    try {
      const message = await onSubmit(value);
      if (message) {
        setError(message);
        return;
      }
      setOpen(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} swipeDirection="down">
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader>
          <p className="font-bold text-lg">{title}</p>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </DrawerHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-4 pb-4">
            <Field>
              <FieldLabel>{label}</FieldLabel>
              <Input
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
                placeholder={placeholder}
                inputMode="decimal"
                autoComplete="off"
              />
              {error && <span className="text-destructive text-xs">{error}</span>}
            </Field>
          </div>

          <DrawerFooter>
            <div className="flex gap-2">
              <DrawerClose render={<Button className="flex-1" size="lg" variant="outline" type="button">Cancelar</Button>} />
              <Button className="flex-1" size="lg" type="submit" disabled={pending}>
                Salvar
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
