import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { Event } from "../types";
import { useI18n } from "../lib/i18n";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useI18n();
  const title = t(`events.data.${event.id}.title`, event.title);
  const date = t(`events.data.${event.id}.date`, event.date);
  const time = t(`events.data.${event.id}.time`, event.time);
  const location = t(`events.data.${event.id}.location`, event.location);
  const description = t(`events.data.${event.id}.description`, event.description);
  const partnersInfo = t(`events.data.${event.id}.partnersInfo`, event.partnersInfo);

  return (
    <div
      data-gsap="event-card"
      className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1 max-w-3xl w-full sm:w-auto mx-auto"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={event.image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3
            className="font-sans font-extrabold tracking-tight text-white text-2xl sm:text-3xl"
            data-i18n={`events.data.${event.id}.title`}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        {/* Infos pratiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" aria-hidden />
            </div>
            <div>
              <div className="text-muted-foreground text-xs" data-i18n="events.cardLabels.date">
                {t("events.cardLabels.date")}
              </div>
              <div className="text-foreground" data-i18n={`events.data.${event.id}.date`}>
                {date}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-accent" aria-hidden />
            </div>
            <div>
              <div className="text-muted-foreground text-xs" data-i18n="events.cardLabels.time">
                {t("events.cardLabels.time")}
              </div>
              <div className="text-foreground" data-i18n={`events.data.${event.id}.time`}>
                {time}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-secondary" aria-hidden />
          </div>
          <div>
            <div className="text-muted-foreground text-xs" data-i18n="events.cardLabels.location">
              {t("events.cardLabels.location")}
            </div>
            <div className="text-foreground" data-i18n={`events.data.${event.id}.location`}>
              {location}
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-muted-foreground text-sm leading-relaxed pt-2"
          data-i18n={`events.data.${event.id}.description`}
        >
          {description}
        </p>

        {/* Partenaires */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden />
            <span className="text-muted-foreground" data-i18n={`events.data.${event.id}.partnersInfo`}>
              {partnersInfo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

