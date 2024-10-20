export const variantsBalance = {
  initial: { rotateX: 0 },
  animate: { rotateX: 360, transition: { duration: 0.4, ease: "easeInOut" } },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // initial state (hidden)
  visible: { opacity: 1, y: 0 }, // animate to (visible)
  exit: { opacity: 0, y: -20 }, // exit animation
}
