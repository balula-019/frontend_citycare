const SectionHeading = ({ badge, title, subtitle, align = 'center' }) => (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl mx-auto`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
    </div>
  );
  
  export default SectionHeading;