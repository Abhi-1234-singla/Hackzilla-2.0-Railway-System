import { motion } from 'framer-motion';

export default function GlassCard({ children, title, className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gis-panel backdrop-blur-md border border-gis-border rounded-xl shadow-2xl flex flex-col ${className}`}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gis-border flex justify-between items-center">
          <h2 className="text-sm font-bold tracking-widest text-gis-accent uppercase">{title}</h2>
          <div className="w-2 h-2 rounded-full bg-gis-accent animate-pulse" />
        </div>
      )}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}