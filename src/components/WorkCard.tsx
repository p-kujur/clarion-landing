import type { WorkItem } from '../types/content';

interface WorkCardProps {
  item: WorkItem;
  onClick: () => void;
  className?: string;
}

export default function WorkCard({ item, onClick, className = '' }: WorkCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer bg-white border border-gray-200 rounded p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full hover:border-[#2B468B]/30 ${className}`}
    >
      {item.image && (
        <div className="w-full aspect-[4/3] bg-gray-100 rounded mb-6 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="mb-auto">
        <p className="font-sans font-bold text-xs uppercase tracking-wider text-[#F58220] mb-3">
          {item.category}
        </p>
        <h3 className="font-sans font-bold text-xl text-gray-900 group-hover:text-[#2B468B] transition-colors mb-4 leading-snug">
          {item.title}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          {item.description}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm font-bold text-[#2B468B] group-hover:text-[#F58220] transition-colors">
        Learn more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
}
