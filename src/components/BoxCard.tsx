import { Check, Info, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Box } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useI18n } from "../lib/i18n";
import { ProductFoodInfo } from "./ProductFoodInfo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface BoxCardProps {
  box: Box;
  onAddToCart: (box: Box) => void;
}

export function BoxCard({ box, onAddToCart }: BoxCardProps) {
  const { t } = useI18n();
  const isPremium = box.tier === "premium";

  const categoryIcons: Record<Box["category"], string> = {
    charcuterie: "🥘",
    decouverte: "🎁",
  };

  const categoryLabels: Record<Box["category"], string> = {
    charcuterie: t("boxes.filters.charcuterie"),
    decouverte: t("boxes.filters.decouverte"),
  };

  const name = t(`boxes.data.${box.id}.name`, box.name);
  const description = t(`boxes.data.${box.id}.description`, box.description);
  const availableDate = t(`boxes.data.${box.id}.availableDate`, box.availableDate);
  const priceSuffix = t("common.priceSuffix", "€");
  const hasReferencePrice =
    box.referencePrice && Number.isFinite(box.referencePrice.value) && box.referencePrice.value > box.price;

  return (
    <div
      data-gsap="box-card"
      className={[
        "group bg-card rounded-3xl overflow-hidden border transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1 max-w-xl w-full",
        isPremium ? "border-primary/30 shadow-xl hover:shadow-2xl" : "border-border hover:shadow-2xl",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={box.image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          variant="outline"
          className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border-border"
        >
          <span aria-hidden>{categoryIcons[box.category]}</span>
          <span className="text-foreground" data-i18n={`boxes.filters.${box.category}`}>
            {categoryLabels[box.category]}
          </span>
        </Badge>
        {box.badge && (
          <Badge
            variant="outline"
            className={[
              "absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm border backdrop-blur-sm",
              isPremium ? "bg-primary/15 text-foreground border-primary/30" : "bg-accent/20 text-foreground border-accent/30",
            ].join(" ")}
          >
            {box.badge}
          </Badge>
        )}
        <div className="absolute bottom-3 left-4 right-4 text-[11px] sm:text-xs leading-tight text-white bg-black/55 backdrop-blur-sm px-3 py-2 rounded-full">
          <span data-i18n="boxes.disclaimer">{t("boxes.disclaimer")}</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        <div>
          <h3
            className={[
              "text-foreground mb-2 tracking-tight",
              isPremium ? "font-serif" : "font-sans font-bold",
            ].join(" ")}
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
            data-i18n={`boxes.data.${box.id}.name`}
          >
            {name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed" data-i18n={`boxes.data.${box.id}.description`}>
            {description}
          </p>
        </div>

        {/* Contenu de la box */}
        <div className="space-y-2">
          <div className="text-sm text-foreground" data-i18n="boxes.card.contains">
            {t("boxes.card.contains")}
          </div>
          <ul className="space-y-1.5">
            {box.contents.map((item, index) => {
              const translated = t(`boxes.data.${box.id}.contents.${index}`, item);
              return (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" aria-hidden />
                  <span data-i18n={`boxes.data.${box.id}.contents.${index}`}>{translated}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Prix et disponibilité */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground" data-i18n="boxes.card.pickup">
                {t("boxes.card.pickup")}
              </div>
              <div className="text-sm text-foreground" data-i18n={`boxes.data.${box.id}.availableDate`}>
                {availableDate}
              </div>
            </div>
          <div className="text-right">
              <div className="space-y-1" aria-label="Prix TTC">
                <div
                  className={[
                    "text-3xl text-primary leading-none",
                    isPremium ? "font-serif" : "font-sans font-extrabold",
                  ].join(" ")}
                  data-i18n={`boxes.data.${box.id}.price`}
                >
                  {box.price.toFixed(2)}
                  {priceSuffix}
                </div>
                {hasReferencePrice && (
                  <div className="text-sm text-muted-foreground">
                    <span className="line-through">
                      {box.referencePrice?.value.toFixed(2)}
                      {priceSuffix}
                    </span>{" "}
                    <span className="text-xs">
                      {box.referencePrice?.periodLabel || "Prix de référence (30 jours)"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={() => onAddToCart(box)}
            className={[
              "w-full h-auto py-3 px-6 rounded-full transition-all group/btn text-base",
              isPremium ? "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" : "",
            ].join(" ")}
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" aria-hidden />
            <span data-i18n="boxes.card.preorder">{t("boxes.card.preorder")}</span>
          </Button>
        </div>

        {box.foodInfo && (
          <Accordion type="single" collapsible className="pt-4 border-t border-border">
            <AccordionItem value="food-info">
              <AccordionTrigger className="text-sm font-medium text-foreground gap-2">
                <Info className="w-4 h-4" aria-hidden />
                Informations alimentaires (dépliable)
              </AccordionTrigger>
              <AccordionContent>
                <ProductFoodInfo info={box.foodInfo} className="mt-3" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}
