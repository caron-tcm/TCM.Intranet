import estilos from "./aovivo.module.scss";

type params = {
  src: string;
  id: string;
};

export default function AoVivo({ src, id }: params) {
  
  return (
    <iframe className={estilos.player} src={src}
            allow="autoplay; encrypted-media; picture-in-picture"
            title="video"
            allowFullScreen
            frameBorder="0"
    />
  );
}
