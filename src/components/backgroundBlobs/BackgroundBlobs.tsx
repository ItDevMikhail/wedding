// export const BackgroundBlobs = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden bg-[#faf8f6]">
//       {/* Сфера 1 */}
//       <motion.div
//         animate={{
//           x: [0, 100, 0],
//           y: [0, 50, 0],
//           scale: [1, 1.5, 1],
//         }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//         className="absolute -top-20 -left-20 w-96 h-96 bg-[#A3B18A] rounded-full blur-[80px] opacity-20"
//       />
//       {/* Сфера 2 */}
//       <motion.div
//         animate={{
//           x: [0, -80, 0],
//           y: [0, 120, 0],
//         }}
//         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//         className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#D1BFA7] rounded-full blur-[100px] opacity-30"
//       />
//     </div>
//   );
// };
export const BackgroundBlobs = () => {
 return (
    <div className="fixed inset-0 -z-20 bg-[#FAF9F6] overflow-hidden">
      {/* Мягкий оливковый градиент */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-15"
        style={{ background: 'radial-gradient(circle, #A3B18A 0%, transparent 70%)' }}
      />
      
      {/* Текстура бумаги (Base64) — теперь не зависит от внешних сайтов */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Бежевый блик для баланса */}
      <div 
        className="absolute -bottom-[5%] -left-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-10"
        style={{ background: 'radial-gradient(circle, #D1BFA7 0%, transparent 70%)' }}
      />
    </div>
  );
};