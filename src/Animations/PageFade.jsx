// src/animations/PageFade.jsx
import { motion } from "framer-motion";
import { fadeUp } from "./motionVariants";

export default function PageFade({ children, keyProp }) {
  return (
    <motion.div
      key={keyProp}           // מפתח ייחודי כדי ש-AnimatePresence יפעיל Exit/Enter
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ height: "100%" }}   // שומר על גובה מלא
    >
      {children}
    </motion.div>
  );
}
