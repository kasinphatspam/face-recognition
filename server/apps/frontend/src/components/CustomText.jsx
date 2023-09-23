import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '@/utils/motion';

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-medium text-[16px] ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2(0)} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const FooterText = ({ title , path }) => (
    <div className="font-medium text-lg mt-1 text-black/50 dark:text-white/70" onClick={() => window.location.assign(path)}>{title}</div>
)