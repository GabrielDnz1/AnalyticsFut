import React from 'react';
import type { Event } from '../types';
import { Pencil, X, CheckCircle } from 'lucide-react';

interface EventListProps {
  events: Event[];
  onEventUpdate: (index: number, description: string) => void;
  onDeleteEvent: (index: number) => void;
  onMarkEvent: (index: number) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventUpdate,
  onDeleteEvent,
  onMarkEvent,
}) => {
  const handleDescriptionUpdate = (index: number) => {
    const currentDescription = events[index]?.description || '';
    const newDescription = prompt('Enter event description:', currentDescription);

    if (newDescription !== null && newDescription.trim() !== '') {
      onEventUpdate(index, newDescription.trim());
    }
  };

  return (
    <div className="mt-4 bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Eventos Registrados</h2>
      {events.length === 0 ? (
        <p className="text-gray-400">Sem eventos registrados, por favor, clique no campo para adicionar eventos.</p>
      ) : (
        <div className="space-y-2">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <span className="text-white">
                Event {index + 1}: {event.description || 'No description'} -{' '}
                <span className="italic">{event.timestamp}</span>
              </span>
              <div className="flex items-center space-x-2">
                {/* Botão para marcar/desmarcar evento */}
                <button
                  onClick={() => onMarkEvent(index)}
                  className={`p-1 hover:bg-green-500 rounded-full transition-colors ${
                    event.marked ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  title="Mark Event"
                >
                  <CheckCircle className="w-4 h-4 text-gray-300" />
                </button>

                {/* Botão para editar a descrição do evento */}
                <button
                  onClick={() => handleDescriptionUpdate(index)}
                  className="p-1 hover:bg-gray-500 rounded-full transition-colors"
                  title="Edit Description"
                >
                  <Pencil className="w-4 h-4 text-gray-300" />
                </button>

                {/* Botão para deletar o evento */}
                <button
                  onClick={() => onDeleteEvent(index)}
                  className="p-1 hover:bg-red-500 rounded-full transition-colors"
                  title="Delete Event"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
