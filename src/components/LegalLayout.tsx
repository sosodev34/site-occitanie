import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  updatedAt?: string;
  children: ReactNode;
  action?: ReactNode;
};

export function LegalLayout({ title, description, updatedAt, children, action }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">
                  Accueil
                </Link>{" "}
                / {title}
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
          {updatedAt && (
            <p className="text-sm text-muted-foreground">Dernière mise à jour : {updatedAt}</p>
          )}
        </div>

        <div className="space-y-8 leading-relaxed text-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
}
