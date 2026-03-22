import "./dressCode.scss";

const colors = ["#E5D3C5", "#9A8C73", "#6D4C41", "#3E2723", "#F5F5F5"];

export const DressCode = () => (
  <section className="dresscode">
    <h2>Дресс-код</h2>
    <p>Будем признательны, если вы поддержите цветовую гамму нашей свадьбы:</p>
    <div className="palette">
      {colors.map((color) => (
        <div
          key={color}
          className="color-circle"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  </section>
);
