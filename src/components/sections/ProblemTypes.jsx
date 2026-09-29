import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../shared/SectionHeading';
import { PROBLEM_TYPES, problemTypeLabelKey } from '../../constants/problemTypes';

const ProblemTypes = ({ onReport }) => {
  const { t } = useTranslation();

  return (
    <section id="problem-types" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t('cc.problems.badge', 'What you can report')}
          title={t('cc.problems.title', 'Thirteen kinds of problem, one place to report them')}
          subtitle={t(
            'cc.problems.subtitle',
            'Pick the type that fits and City Care already knows which authority owns it.',
          )}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PROBLEM_TYPES.map((type, index) => (
            <motion.button
              key={type.value}
              type="button"
              onClick={onReport}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index, 8) * 0.05 }}
              whileHover={{ y: -6 }}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-5 text-left transition-colors duration-300 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <type.icon size={20} />
              </span>
              <span className="font-semibold leading-snug text-dark">
                {t(problemTypeLabelKey(type.value), type.label)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemTypes;
