import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div
      data-gsap="event-card"
      className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1 max-w-2xl w-full sm:w-auto justify-self-center mx-auto"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-sans font-extrabold tracking-tight text-white text-2xl sm:text-3xl">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        {/* Infos pratiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Date</div>
              <div className="text-foreground">{event.date}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Horaires</div>
              <div className="text-foreground">{event.time}</div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Lieu</div>
            <div className="text-foreground">{event.location}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed pt-2">
          {event.description}
        </p>

        {/* Partenaires */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{event.partnersInfo}</span>
          </div>
        </div>

        {/* Bouton */}
        <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all">
          Je participe
        </button>
      </div>
    </div>
  );
}
