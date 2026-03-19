import { FoodInfo } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";

interface ProductFoodInfoProps {
  info: FoodInfo;
  className?: string;
}

// Composant réutilisable pour afficher les informations alimentaires obligatoires.
export function ProductFoodInfo({ info, className }: ProductFoodInfoProps) {
  const hasAllergens = info.allergens && info.allergens.length > 0;

  const nutritionEntries = info.nutrition
    ? Object.entries(info.nutrition).filter(
        ([, value]) => Boolean(value) && value !== undefined
      )
    : [];

  return (
    <div
      className={["rounded-2xl border border-border bg-card/70 p-4 sm:p-5", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Informations produit alimentaire
          </p>
          <h4 className="text-lg font-semibold text-foreground mt-1">{info.denomination}</h4>
          {info.description && (
            <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
          )}
        </div>
        {hasAllergens && (
          <Badge variant="secondary" className="bg-destructive/10 text-destructive">
            Allergènes
          </Badge>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {info.netQuantity && (
          <DataRow label="Poids / quantité nette" value={info.netQuantity} />
        )}
        {info.origin && <DataRow label="Origine / provenance" value={info.origin} />}
        {info.ddmOrDlc && <DataRow label="DDM / DLC" value={info.ddmOrDlc} />}
        {info.storage && <DataRow label="Conditions de conservation" value={info.storage} />}
        {info.usageTips && <DataRow label="Conseils d'utilisation" value={info.usageTips} />}
      </div>

      {info.ingredients && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-foreground">Liste des ingrédients</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">{info.ingredients}</p>
        </div>
      )}

      {hasAllergens && (
        <div className="mt-3">
          <h5 className="text-sm font-semibold text-foreground">Allergènes</h5>
          <p className="text-sm text-destructive leading-relaxed">
            {info.allergens!.join(", ")}
          </p>
        </div>
      )}

      {nutritionEntries.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-foreground">Informations nutritionnelles</h5>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
            {nutritionEntries.map(([key, value]) => (
              <div key={key} className="rounded-lg bg-muted px-3 py-2">
                <p className="text-xs uppercase tracking-[0.08em] text-foreground/70">{labelForNutrition(key)}</p>
                <p className="font-medium text-foreground">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {info.boxComposition && info.boxComposition.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-foreground">Composition de la box</h5>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {info.boxComposition.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      )}

      {info.items && info.items.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-foreground mb-2">
            Détails par produit inclus
          </h5>
          <Accordion type="multiple" className="border border-border rounded-xl divide-y divide-border">
            {info.items.map((item, index) => (
              <AccordionItem key={item.name + index} value={`${item.name}-${index}`}>
                <AccordionTrigger className="px-3 py-2 text-left">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    {item.netQuantity && (
                      <span className="text-xs text-muted-foreground">{item.netQuantity}</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3 text-sm space-y-2 text-muted-foreground">
                  {item.ingredients && (
                    <p>
                      <span className="font-semibold text-foreground">Ingrédients : </span>
                      {item.ingredients}
                    </p>
                  )}
                  {item.allergens && item.allergens.length > 0 && (
                    <p className="text-destructive">
                      <span className="font-semibold text-foreground">Allergènes : </span>
                      {item.allergens.join(", ")}
                    </p>
                  )}
                  {item.origin && (
                    <p>
                      <span className="font-semibold text-foreground">Origine : </span>
                      {item.origin}
                    </p>
                  )}
                  {item.notes && <p>{item.notes}</p>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted px-3 py-2 text-sm">
      <p className="text-xs uppercase tracking-[0.08em] text-foreground/70">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
}

function labelForNutrition(key: string) {
  switch (key) {
    case "energy":
      return "Énergie";
    case "fat":
      return "Matières grasses";
    case "saturates":
      return "dont acides gras saturés";
    case "carbs":
      return "Glucides";
    case "sugars":
      return "dont sucres";
    case "protein":
      return "Protéines";
    case "salt":
      return "Sel";
    default:
      return key;
  }
}
